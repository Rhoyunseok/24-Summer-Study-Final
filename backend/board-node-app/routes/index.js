var express = require("express");
var router = express.Router();

//동기 방식으로 동작하는 함수
/* router.get("/", function (req, res, next) {
   res.render("index", { title: "Express" });
 });*/

//비동0기 방식으로 동작하는 함수
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Express" });
});

// //로그인페이지
// router.get("/login", async (req, res, next) => {
//   res.render("login", {
//     resultMsg: {
//       code: null,
//       msg: null,
//     },
//   });
// });

// //로그인 처리
// //db에 저장된 아이디와 비밀번호를 비교하여 로그인 처리
// router.post("/login", async (req, res, next) => {
//   res.render("login");
// });

module.exports = router;
