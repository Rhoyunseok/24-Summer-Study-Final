const path = require("path");
const Sequelize = require("sequelize");

//개발모드환경설정
const env = process.env.NODE_ENV || "development";
//DB연결환경설정정보변경처리//관련정보수정

const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
//데이터베이스객체

const db = {};
//DB연결정보로시퀄라이즈ORM 객체생성

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
//DB 처리객체에시퀄라이즈정보맵핑처리
//이후DB객체를통해데이터관리가능해짐

db.sequelize = sequelize; //DB연결정보를포함한DB제어객체속성(CRUD)

db.Sequelize = Sequelize; //Sequelize팩키지에서제공하는각종데이터타입및관련객체정보를제공함

//회원모델모듈파일참조하고db속성정의하기
db.Member = require("./member.js")(sequelize, Sequelize);
//게시판모델모듈파일참조하고db속성정의하기
db.Board = require("./board.js")(sequelize, Sequelize);

//db객체외부로노출하기
module.exports = db;
