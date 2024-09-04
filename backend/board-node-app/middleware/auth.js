const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "인증 토큰이 없습니다." });
  }

  const token = authHeader.split(" ")[1]; // "Bearer 토큰"에서 토큰만 추출

  try {
    // 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 비밀 키 확인
    console.log("Decoded Token:", decoded); // 토큰에 포함된 정보를 로그로 출력
    req.user = decoded; // 검증된 사용자 정보 저장
    next(); // 미들웨어 통과
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res
      .status(401)
      .json({ message: "유효하지 않은 토큰입니다.", error });
  }
};

module.exports = authMiddleware; // 이 미들웨어를 export하여 라우트 파일에서 불러오기
