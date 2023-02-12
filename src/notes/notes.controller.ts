import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateNoteDto } from './dto/CreateNote.dto';
import { UpdateNoteDto } from './dto/UpdateNote.dto';
import { NotesService } from './notes.service';
import { notes } from './schema/notes.schema';
import { Query as ExpressQuery } from 'express-serve-static-core'

@Controller('notes')
export class NotesController {
    constructor(private noteService: NotesService){}

    @Get()
    async getAllNotes(@Query() query: ExpressQuery): Promise<notes[]>{
        return this.noteService.findAll(query);
    }

    @Post()
    async createNote( @Body() note: CreateNoteDto,): Promise<notes>{
        return this.noteService.create(note)
    }
    
    @Get(':id')
    async getNote(
        @Param('id') id: string,
        ): Promise<notes>{
            return this.noteService.findById(id);
        }
        
    @Put(':id')
    async updateNote( 
        @Param('id') id: string,
        @Body() note: UpdateNoteDto,): Promise<notes>{
            return this.noteService.updateById(id, note)
        }

    @Delete(':id')
    async deleteNote(
        @Param('id') id: string,
        ): Promise<notes>{
            return this.noteService.deleteById(id);
        }
    }
    