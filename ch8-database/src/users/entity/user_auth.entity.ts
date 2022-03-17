import {
  Column,
  Entity, JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import {UserEntity} from "./user.entity";

@Entity('user_auth')
export class User_authEntity{
  @PrimaryGeneratedColumn()
  seq: number;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 60 })
  signupVerifyToken: string;

  @Column({ length: 45 })
  auth: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name:'id'})
  id : UserEntity;


}