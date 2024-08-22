var express = require("express");
var router = express.Router();

//동기 방식으로 동작하는 함수
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//비동기 방식으로 동작하는 함수
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
