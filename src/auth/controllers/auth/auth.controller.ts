import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from 'src/auth/dtos/SignInDto';
import { AuthService } from 'src/auth/service/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post("signIn")
    signIn (@Body() signInDto:SignInDto) {
        return this.authService.signIn(signInDto.email , signInDto.password);
    }

}
