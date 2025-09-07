import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Model } from "mongoose";
import { User, UserDocument } from "../user/schemas/user.schema";





@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwt: JwtService,
                private configService: ConfigService
    ) {}


    async existingUser(username:string, email:string):Promise<boolean> {

        //check if user with username or email currently exists
        const existingUser = await this.userModel.findOne({
            $or: [
                { username: username,
                    email: email
                }
            ],
        });

        return !!existingUser;
    }

    //Registers new user into the system
    async register(registerUser: RegisterDto): Promise<{message: string}> {

        const userExists = await this.existingUser(registerUser.username, registerUser.email);

        //throw error is email or username exist
        if (userExists) {

            throw new BadRequestException('Username or email already exists');

        }

        //check user input passwords match
        if(registerUser.password !== registerUser.password_confirm) {

            throw  new BadRequestException("Passwords don't match");

        }


        //hash password before storing
        const hashedPassword = await bcrypt.hash(registerUser.username, 10);

        //create new model and create new user
        const user = new this.userModel({
            username  : registerUser.username,
            email     : registerUser.email,
            password  : hashedPassword,
            firstName : registerUser.first_name,
            lastName  : registerUser.last_name,
        });


        const savedUser = await user.save();


        if(!savedUser) {
            throw new InternalServerErrorException("registration failed")
        }

        return { message : "Successfully registered" };
    }

    //Login new user functions
    async validateUser(username: string, password: string): Promise<UserDocument> {

        //find user
        const user: UserDocument | null = await this.userModel.findOne({ username: username });

        //check if the user exists
        if(!user) {

            throw new UnauthorizedException('Invalid credentials');
        }

        //validate user password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        //check if the passwords matches the record
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
    async login(loginDto: LoginDto): Promise<{ message:string, token: string }>  {


        //find user in db
        const user = await this.validateUser(loginDto.username, loginDto.password);

        const user_id = user._id;

        const payload = {sub: user_id, email: user.email};

        //create and sign token
        const token = this.jwt.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '1d'
        });

        return {
            message : 'login successful',
            token   : token
        };
    }


    //log out function
    async logout(res: any) {
        res.clearCookie('token');
        return {message: 'Logged out successfully'};
    }
}
