import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'PALABRA_SECRETA_123',
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.id) {
      throw new UnauthorizedException();
    }
    return payload; // Retorna el payload validado
  }
}
