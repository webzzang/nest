import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Team} from './team'

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  //join하지 않고 외래키값만 가져오기
  @Column({ name: 'team_id' })
  teamId: number;

  // Entity relation을 정의할때 eager 옵션 입력시 join을 해준다.
  // @ManyToOne(() => Team, {eager:true})
  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column()
  create_at: Date;
}