import { CanActivate, Catch, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
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
            request['user'] =  payload;
        }catch{
            throw new UnauthorizedException();
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