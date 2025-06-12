import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsNumber()
    userId: number;

    @IsString()
    type: string;

    @IsOptional()
    data?:Record<string,any>;
}
