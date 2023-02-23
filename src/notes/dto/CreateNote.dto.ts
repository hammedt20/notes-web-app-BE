import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { user } from "../../auth/schema/user.schema";

export class CreateNoteDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsEmpty({ message: 'You can not pass user id' })
    readonly user: user
}
