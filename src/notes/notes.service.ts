import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose'
import * as mongoose from 'mongoose';
import { notes } from './schema/notes.schema';
import { Query } from 'express-serve-static-core'

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(notes.name)
        private noteModel: mongoose.Model<notes>
    ){}

    async findAll(query: Query): Promise<notes[]> {

        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}

        const Notes = await this.noteModel.find({ ...keyword });
        return Notes;
    }

    async create(note: notes): Promise<notes>{
        const res = await this.noteModel.create(note)
        return res;
    }

    async findById(id: string): Promise<notes>{
        const isValid = mongoose.isValidObjectId(id)

        if(!isValid){
            throw new BadRequestException('Please enter correct id')
        }

        const note = await this.noteModel.findById(id)

        if(!note){
            throw new NotFoundException('Note not found');
        }
        return note;
    }

    async updateById(id: string, note: notes): Promise<notes>{
       return await this.noteModel.findByIdAndUpdate(id, note, {
        new: true,
        runValidators: true
       })
    }

    async deleteById(id: string): Promise<notes>{
       return await this.noteModel.findByIdAndDelete(id)
    }
}
