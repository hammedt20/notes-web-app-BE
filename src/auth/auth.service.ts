import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel, } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { user } from './schema/user.schema';
import { compare, hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signup.dto';
import { logInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(user.name)
        private userModel: mongoose.Model<user>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDto: signUpDto): Promise<{ token: string }>{
        const { name, email, password } = signUpDto

        const hashedPassword = await hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.jwtService.sign({id: user._id })
        return { token }
    }

    async login(logInDto: logInDto): Promise<{ token: string }>{
        const { email, password } = logInDto

        const user = await this.userModel.findOne({ email })

        if(!user){
            throw new UnauthorizedException("Invalid username or password")
        }
        
        const isPasswordMatched = await compare(password, user.password)
        if(!isPasswordMatched){
            throw new UnauthorizedException("Invalid username or password")
        }

        const token = this.jwtService.sign({id: user._id })
        return { token }
    }
}
