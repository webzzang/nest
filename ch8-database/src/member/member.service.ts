import {Injectable} from '@nestjs/common';
import {Connection, getManager} from "typeorm";
import {Member} from "./entity/member";
import {MemberView} from "./entity/member.view";
import {MemberRepository} from "./repository/member.repository";
import {MemberRepository2} from "./repository/member.repository2";

@Injectable()
export class MemberService {


  constructor(
      private connection : Connection,
      private readonly memberRepository: MemberRepository,
      private readonly memberRepository2: MemberRepository2,
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
    // const member = await getManager().findOne(MemberView);
    const memberRepository = this.connection.getRepository(MemberView);
    const member = await memberRepository.findOne(1);
    console.log(member);

    return member;

  }

  public async findOr(userId: string) {
    // const member = this.memberRepository.findQueryBuilder({where:{id:3, email:'3@naver.com'}});
    const member = this.memberRepository2.findQueryApplier({where:[{id:3, email:'3@naver.com'}]});
    console.log(member);

    return member;

  }
}