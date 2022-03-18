import {AbstractRepository, Brackets, EntityRepository} from 'typeorm'
import { Member } from 'src/member/entity/member'

export interface MemberFindAllWhereOptions {
  id?: number
  email?: string
  name?: string
}

export interface MemberFindAllOptions {
  where?: MemberFindAllWhereOptions | MemberFindAllWhereOptions[]
  skip?: number
  take?: number
}

@EntityRepository(Member)
export class MemberRepository extends AbstractRepository<Member> {

  public async findQueryBuilder(options: MemberFindAllOptions = {}) {
    const { where, skip, take } = options

    const qb = this.repository
    .createQueryBuilder('member')
    .leftJoinAndSelect('member.team', 'team')
    // .leftJoinAndSelect('Member.name', 'name')

    if (where) {
      // 가장 상위에 AND 연산으로 괄호를 씌워줘야한다: ( (...) OR (...) OR (...) )
      if (Array.isArray(where)) {
        qb.andWhere(
            new Brackets((qb) => {
              // where이 배열이면 OR 연산: (...) OR (...) OR (...)
              where.forEach((wh) => {
                qb.orWhere(
                    // OR 연산
                    new Brackets((qb) => {
                      // where의 배열 한 요소마다 괄호를 씌운다
                      const { id, email, name } = wh
                      if (id) qb.andWhere(`member.id = ${id}`)
                      if (email) qb.andWhere(`member.email = "${email}"`)
                      if (name) qb.andWhere(`member.name = "${name}"`)
                    }),
                )
              })
            }),
        )
      } else {
        const { id, email, name } = where
        if (id) qb.andWhere('member.id = :id', { id })
        if (email) qb.andWhere('member.email = :email', { email })
        if (name) qb.andWhere('member.name = :name', { name })
      }
    }

    // qb.skip(skip ?? 0)
    // qb.skip(take ?? 20)

    const [items, total] = await qb.getManyAndCount()

    console.log({items, total});

    return { items, total }
  }
}