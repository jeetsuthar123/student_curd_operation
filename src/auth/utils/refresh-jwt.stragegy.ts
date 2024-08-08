/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from 'src/common/config/env.schema';
import { JwtUserObject } from 'src/common/dto/user-jwt-data.dto';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(configService: ConfigService) {
        // configure the passport refrseh jwt strategy
        const jwtConfig = configService.get<JwtConfig>('jwtConfig');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig?.refreshTokenSecret,
        });
    }

    async validate(payload: JwtUserObject) {
        return payload;
    }
}
