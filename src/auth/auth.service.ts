import { Injectable } from '@nestjs/common';
import { InjectModel, } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { user } from './schema/user.schema';
import { hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signup.dto';

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
}
