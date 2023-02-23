import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { user } from "../../auth/schema/user.schema";



@Schema({
    timestamps: true
})
export class notes {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "user" })
    user: user;

}

export const NoteSchema = SchemaFactory.createForClass(notes)