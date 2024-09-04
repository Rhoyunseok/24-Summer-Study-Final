var express = require("express");
var router = express.Router();
var db = require("../models/index");
var jwt = require("jsonwebtoken");

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
    //사용자 토큰정보 유효성 검사 후 정상적이면 토큰내에 사용자 인증 json데이터를 반환합니다.
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

module.exports = router;
