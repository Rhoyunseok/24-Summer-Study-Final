var express = require("express");
var router = express.Router();
var db = require("../models/index");
var jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/auth"); // 인증 미들웨어

/*
-호출 주소 : http://localhost:5000/api/board/list
*/
router.get("/list", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    const board = await db.Board.findAll();

    apiResult.code = 200;
    apiResult.data = board;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  res.json(apiResult);
});

/*
-호출 주소 : http://localhost:5000/api/board/create
*/
router.post("/create", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    var token = req.headers.authorization.split("Bearer ")[1];
    console.log("api token : ", token);
    //사용자 토큰정보 유효성 검사 후 정상await적이면 토큰내에 사용자 인증 json데이터를 반환합니다.
    var loginMemberData = await jwt.verify(token, process.env.JWT_AUTH_KEY);

    const title = req.body.title;
    const contents = req.body.contents;
    const is_display_code = req.body.is_display_code;
    const board_type_code = req.body.board_type_code;
    // const uploadFile = req.body.uploadFile;

    const board = {
      board_type_code: board_type_code,
      title: title,
      contents: contents,
      view_count: 0,
      ip_address: req.ip,
      is_display_code: is_display_code,
      reg_date: Date.now(),
      reg_member_id: loginMemberData.member_id,
    };
    let registedBoard = await db.Board.create(board);

    apiResult.code = 200;
    apiResult.data = registedBoard;
    apiResult.msg = "게시글이 등록되었습니다.";
    return res.json(apiResult);
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "게시글 등록에 실패하였습니다.";
    console.error(err);
  }
  res.json(apiResult);
});

/*
-호출 주소 : http://localhost:5000/api/board/mypage
*/
router.get("/mypage", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.member_id; // JWT 토큰에서 추출한 사용자 ID (member_id 확인)
    const userName = req.user.name;
    // 데이터베이스에서 해당 사용자의 게시물만 조회
    const boards = await db.Board.findAll({
      where: { reg_member_id: userId }, // 로그인한 사용자의 게시물만 가져옴
      attributes: [
        "board_id",
        "title",
        "contents",
        "view_count",
        "reg_date",
        "board_type_code",
      ], // 필요한 필드만 선택
    });

    if (!boards) {
      return res.status(404).json({ message: "게시글이 없습니다." });
    }

    res.status(200).json({ data: boards, userName, userId, msg: "OK" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "서버 오류가 발생했습니다.", error: error.message });
  }
});

/*
조회수 증가
*/
router.put("/:id/view", async (req, res) => {
  const boardId = req.params.id;

  try {
    // 게시글을 조회하고 조회수를 1 증가
    const board = await db.Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    // 조회수 증가
    board.view_count += 1;
    await board.save();

    res.status(200).json({ message: "조회수가 증가했습니다." });
  } catch (error) {
    console.error("Error updating view count:", error);
    res
      .status(500)
      .json({ message: "서버 오류로 조회수 증가에 실패했습니다." });
  }
});
/*
-호출 주소 : http://localhost:5000/api/board/:id
*/
router.get("/:id", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    const boardIdx = req.params.id;
    const board = await db.Board.findOne({
      where: { board_id: boardIdx },
    });
    apiResult.code = 200;
    apiResult.data = board;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  res.json(apiResult);
});

/*
삭제 처리 : DELETE
-호출 주소 : http://localhost:5000/api/board/:id
*/
router.delete("/:id", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    const boardIdx = req.params.id;
    const board = await db.Board.findOne({
      where: { board_id: boardIdx },
    });
    if (!board) {
      apiResult.code = 404;
      apiResult.data = null;
      apiResult.msg = "게시글이 없습니다.";
      return res.json(apiResult);
    }
    await board.destroy();
    apiResult.code = 200;
    apiResult.data = board;
    apiResult.msg = "게시글이 삭제되었습니다.";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  res.json(apiResult);
});

/*
수정 처리 : PUT
-호출 주소 : http://localhost:5000/api/board/modify/:id
*/
router.put("/modify/:id", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    const boardIdx = req.params.id;
    const board = await db.Board.findOne({
      where: { board_id: boardIdx },
    });
    if (!board) {
      apiResult.code = 404;
      apiResult.data = null;
      apiResult.msg = "게시글이 없습니다.";
      return res.json(apiResult);
    }
    const title = req.body.title;
    const contents = req.body.contents;
    const is_display_code = req.body.is_display_code;
    const board_type_code = req.body.board_type_code;

    board.title = title;
    board.contents = contents;
    board.is_display_code = is_display_code;
    board.board_type_code = board_type_code;
    await board.save();
    apiResult.code = 200;
    apiResult.data = board;
    apiResult.msg = "게시글이 수정되었습니다.";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  res.json(apiResult);
});

module.exports = router;
