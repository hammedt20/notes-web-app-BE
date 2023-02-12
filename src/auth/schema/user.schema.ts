import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class user {
    @Prop()
    name: string

    @Prop({ unique: [true, 'Duplicate email entered'] })
    email: string

    @Prop()
    password: string
}

export const userSchema = SchemaFactory.createForClass(user)