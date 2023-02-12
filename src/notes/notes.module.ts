import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NoteSchema } from './schema/notes.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'notes', schema: NoteSchema}])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
