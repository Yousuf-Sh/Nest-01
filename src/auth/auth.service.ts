import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService
    ){}

    async login(email:string,password:string):Promise<{access_token: string}>{
     
        const user = await this.userService.findByEmail(email);

        if(password!=user.password){
            throw new UnauthorizedException('Operation Not Allowed');
        }
            const payload= {sub: user.email , username:user.email}
            return{
                access_token: await this.jwtService.signAsync(payload)
            }
        
    }
}
