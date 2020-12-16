import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports : [UsersModule, 
    PassportModule,
  JwtModule.register({
    secret : jwtConstants.secret,
    signOptions:{expiresIn: jwtConstants.expiration}
  })],
  providers: [AuthService,
               LocalStrategy, 
               JwtStrategy,
               /*{//Enable authentication globally=> from link itself
                provide: APP_GUARD,
                useClass: JwtAuthGuard,
              },*/],
  exports : [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
