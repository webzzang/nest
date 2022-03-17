import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  create_at: Date;
}