import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";
import { timestamp } from "rxjs";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;
    
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: string;

    @CreateDateColumn({type:'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

}