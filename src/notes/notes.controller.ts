import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { CreateNoteDto } from './dto/CreateNote.dto';
import { UpdateNoteDto } from './dto/UpdateNote.dto';
import { NotesService } from './notes.service';
import { notes } from './schema/notes.schema';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
export class NotesController {
    constructor(private noteService: NotesService){}

    @Get()
    async getAllNotes(@Query() query: ExpressQuery): Promise<notes[]>{
        return this.noteService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createNote( 
        @Body() note: CreateNoteDto,
        @Req() req): Promise<notes>{
        return this.noteService.create(note, req.user)
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
    