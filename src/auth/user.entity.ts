import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

}