import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { findUserById } from "../../modules/users/user.service";
import { User } from "@prisma/client";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

type TokenPayload = {
    id: number
}

export const strategy = new JwtStrategy(options, async (payload: TokenPayload, done) => {
    try {
        const user = await findUserById(payload.id)

        if(user) {
            done(null, user)
        } else {
            done(null, false)
        }


    } catch (err) {
        done(err, false);
    }
})