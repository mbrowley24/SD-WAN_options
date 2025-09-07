import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from "passport-jwt";
import * as process from "node:process";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([

                (req) => {

                    return req?.cookies?.token || null
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'defaultSecret'
        });
    }

    async validate(payload: any) {

        // console.log('payload', payload);
        // console.log(payload);
        return {
            email        : payload.email,
            organization : payload.organization,
            roles        : payload.roles,
            userId       : payload.sub,
        };
    }
}