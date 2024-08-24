var express = require("express");
var router = express.Router();

var db = require("../models/index");

const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/*
신규 회원가입 등록 처리 : POST
호출 주소 : http://localhost:5000/api/member/entry
*/

router.post("/entry", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const use_role_code = req.body.use_role_code;
    const use_state_code = req.body.use_state_code;

    //이메일 중복체크
    const existMember = await db.Member.findOne({ where: { email: email } });

    if (existMember) {
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "이미 가입된 회원입니다.";

      return res.json(apiResult);
    }

    //사용자 암호 단방향 암호화 문자열로 변환하기
    const encryptedPassword = await bcrypt.hash(password, 12);

    //회원정보 등록처리
    const member = {
      email: email,
      member_password: encryptedPassword,
      name: name,
      use_role_code: use_role_code,
      use_state_code: use_state_code,
      entry_date: Date.now(),
    };

    let registedMember = await db.Member.create(member);
    registedMember.member_password = ""; //프론트엔드에 비밀번호 정보 보내지 않기

    apiResult.code = 200;
    apiResult.data = registedMember;
    apiResult.msg = "가입되었습니다.";

    return res.json(apiResult);
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "가입처리에 실패했습니다.";
    console.error(err);
  }
  res.json(apiResult);
});

router.post("/login", async (req, res, next) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    const email = req.body.email;
    const password = req.body.password;

    const member = await db.Member.findOne({ where: { email: email } });

    if (!member) {
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "가입되지 않은 회원입니다.";

      return res.json(apiResult);
    }

    const compareResult = await bcrypt.compare(
      password,
      member.member_password
    );
    if (!compareResult) {
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "비밀번호가 일치하지 않습니다.";
      return res.json(apiResult);
    }
    const tokenJsonData = {
      member_id: member.member_id,
      email: member.email,
      name: member.name,
    };
    const token = await jwt.sign(tokenJsonData, process.env.JWT_AUTH_KEY, {
      expiresIn: "24h",
      issuer: "RHO",
    });
    apiResult.code = 200;
    apiResult.data = {
      token: token,
      member: {
        member_id: tokenJsonData.member_id,
        email: tokenJsonData.email,
        name: tokenJsonData.name,
      },
    };
    apiResult.msg = "로그인되었습니다.";
    return res.json(apiResult);
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "로그인처리에 실패했습니다.";
    console.error(err);
  }
});

module.exports = router;
