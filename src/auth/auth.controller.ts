import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logInDto } from './dto/login.dto';
import { signUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() SignUpDto: signUpDto): Promise<{ token: string }> {
        return this.authService.signUp(SignUpDto)
    }

    @Get('/login')
    login(@Body() LogInDto: logInDto): Promise<{ token: string }> {
        return this.authService.login(LogInDto)
    }
}
