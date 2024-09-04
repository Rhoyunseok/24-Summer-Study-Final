const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // .env 파일의 설정을 불러옵니다.

const authMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "인증 토큰이 없습니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 토큰 검증
    req.user = decoded; // 토큰에서 사용자 정보 추출
    next(); // 인증이 완료되면 다음 미들웨어로 이동
  } catch (error) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};

module.exports = authMiddleware;
