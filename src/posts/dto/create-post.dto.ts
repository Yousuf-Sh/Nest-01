import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title:string;
  
  @IsNotEmpty()
  @IsString()
  content:string;
  
  @IsNotEmpty()
  @IsNumber()
  userId:number;  
  
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsNumber({allowNaN:false,allowInfinity:false},{each:true})
  @IsNotEmpty()
  tags:number[];
}
