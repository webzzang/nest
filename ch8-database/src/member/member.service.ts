import {Injectable} from '@nestjs/common';
import {Connection, getManager} from "typeorm";
import {Member} from "./entity/member";
import {MemberView} from "./entity/member.view";

@Injectable()
export class MemberService {


  constructor(
      private connection : Connection,
  ) { }

  public async findOneByUserId(userId: string) {

    const memberRepository = this.connection.getRepository(Member);
    const member = await memberRepository.findOne(1);
    // const member = await memberRepository.findOne(1, {
    //   relations: ['team']  // <-
    // });
    console.log(member);

    return member;

  }

  public async findManyToMany(userId: string) {

    const memberRepository = this.connection.getRepository(Member);
    // const member = await memberRepository.findOne(1);
    const member = await memberRepository.findOne(1, {
      join: {                 // <-
        alias: 'm',
        leftJoinAndSelect: {
          team: 'm.team'
        }
      }
    });
    console.log(member);

    return member;

  }

  public async findQueryBuilder(userId: string) {

    const member = await this.connection.getRepository(Member).createQueryBuilder('m')
    .select(['m.id', 'm.name', 'm.team', 't.id', 't.description'])
    .leftJoin('m.team', 't')
    .where('m.id = :id', { id: 1 })
    .getOne();
    console.log(member);

    return member;

  }

  public async findViewEntity(userId: string) {

    // const member = await entityManager.findOne(MemberView, { id: 1 });
    const member = await getManager().findOne(MemberView);
    console.log(member);

    return member;

  }
}