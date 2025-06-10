import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() siginInDto:Record<string,any>){
        // return siginInDto;
        return this.authService.login(siginInDto.email,siginInDto.password)
    }
}
