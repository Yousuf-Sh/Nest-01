import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bc from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService
    ){}

    async login(email:string,password:string):Promise<{access_token: string}>{
     
        const user = await this.userService.findByEmail(email);

        const isMathcingPassword = await bc.compare(password,user.password);
        if(!isMathcingPassword) throw new UnauthorizedException('Email Or Password is invalid');

        const payload= {sub: user.id , username:user.email}
        return{
            access_token: await this.jwtService.signAsync(payload)
        }
        
    }
}
