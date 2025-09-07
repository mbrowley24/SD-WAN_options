import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: RegisterDto) {

        const { message }  = await this.authService.register(body);

        return {
            message : message,
            status : HttpStatus.CREATED
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto, @Res({passthrough: true}) res: Response) {

        const {message, token} = await this.authService.login(loginDto);


        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 86400000,
        });


        return {
             message    : message,
             statusCode : 200,
        };

    }

}
