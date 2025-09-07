import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DashboardController } from "../dashboard/dashboard.controller";
import { DashboardModule } from "../dashboard/dashboard.module";
import {DashboardService} from "../dashboard/dashboard.service";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "../user/schemas/user.schema";
import * as process from "node:process";



@Module({
  imports: [
      DashboardModule,
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'dev_secret',
        signOptions: {expiresIn: '1d'},
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, DashboardService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
