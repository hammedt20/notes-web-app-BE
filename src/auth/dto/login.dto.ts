import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class logInDto {

    
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please type in the correct email'})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}
