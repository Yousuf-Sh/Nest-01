import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { UserRole } from "../enums/user-role.enum";
import { IsOptional } from "class-validator";
import { tr } from "@faker-js/faker/.";
import { Post } from "src/posts/entities/post.entity";

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

    @Column({type:'varchar',default:''})
    password:string

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

    @OneToMany(()=>Post,post => post.user)
    posts: Post[]

}