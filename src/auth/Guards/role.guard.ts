import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/Decorators/roles.decorator";
import { UserRole } from "src/users/enums/user-role.enum";

@Injectable()
export class RoleGuard implements CanActivate{
constructor(private reflector:Reflector){}

canActivate(context: ExecutionContext): boolean{
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY,[
        context.getHandler(),
        context.getClass()
    ]);
    if(!requiredRoles){
        return true
    }
    try{
        const {user} = context.switchToHttp().getRequest();
        return requiredRoles.some((role)=> user.roles?.includes(role));
    }catch(e){
        throw new UnauthorizedException(e);
    }
}
}