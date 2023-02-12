import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})
export class notes {

    @Prop()
    title: string;

    @Prop()
    description: string;

}

export const NoteSchema = SchemaFactory.createForClass(notes)