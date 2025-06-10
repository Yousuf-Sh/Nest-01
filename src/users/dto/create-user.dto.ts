import {IsEmail, IsEnum, IsNotEmpty, IsString} from 'class-validator'
import { UserRole } from '../enums/user-role.enum';
export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password:string;
    
    @IsEnum(UserRole)
    role: "STAFF" | "USER" | "ADMIN";
} 