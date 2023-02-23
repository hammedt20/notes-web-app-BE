import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { user } from "./schema/user.schema";
import * as mongoose from 'mongoose'


@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(user.name)
        private userModel: mongoose.Model<user>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payLoad){
        const { id } = payLoad;

        const user = await this.userModel.findById(id)

        if(!user){
            throw new UnauthorizedException('Login first to access this endpoint.')
        }

        return user
    }
}