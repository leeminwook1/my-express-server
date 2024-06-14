import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";

// JWT를 추출하는 방법 지정하고 JWT를 검증할 때 사용할 비밀키 설정
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "kitri_secret",
};

// done : 인증 결과 처리
const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    console.log("HI");

    const user = await User.findById(jwt_payload.id);
    console.log(user);

    if (user) {
      console.log("성공");
      return done(null, user);
    } else {
      console.log("실패");
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

export default jwtStrategy;
