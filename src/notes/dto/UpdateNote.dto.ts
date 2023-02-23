import { IsEmpty, IsOptional, IsString } from "class-validator";
import { user } from "../../auth/schema/user.schema";

export class UpdateNoteDto {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsEmpty({ message: 'You can not pass user id' })
    readonly user: user
}