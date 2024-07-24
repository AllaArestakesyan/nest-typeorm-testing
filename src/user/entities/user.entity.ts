import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./user.role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    age: number;
  
    @Column()
    role: Role;
}
