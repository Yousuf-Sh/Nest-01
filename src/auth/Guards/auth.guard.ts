import { CanActivate, Catch, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService,private usersService:UsersService){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }
        try{
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret:process.env.JWT_SECRET
                }
            );
             const user = await this.usersService.findByEmail(payload.username);
             request['user']= user;
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
        }catch(e){
            throw new UnauthorizedException(e);
        }
        return true;
    }

     private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers['authorization'];
        if(!authHeader || typeof authHeader !== 'string') return undefined;
        const [type, token] = authHeader.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}