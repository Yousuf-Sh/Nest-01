import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";
import { IsOptional } from "class-validator";
import { tr } from "@faker-js/faker/.";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({type:'varchar'})
    email: string;
    
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: string;

    @IsOptional()
    @Column({
        type:'varchar',
        nullable:true,
    })
    image_url: string | null;

    @CreateDateColumn({type:'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

}