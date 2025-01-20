import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './adapters/input/auth.controller';
import { AuthService } from './domain/input-ports/auth.service';
import { JwtStrategy } from './adapters/input/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUsersEntity } from '../../common/entities/system-users.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'PALABRA_SECRETA_123',
      signOptions: { expiresIn: '2h' },
    }),
    TypeOrmModule.forFeature([SystemUsersEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
