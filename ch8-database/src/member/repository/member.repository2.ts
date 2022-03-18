import {AbstractRepository, Brackets, EntityRepository} from 'typeorm'
import { Member } from 'src/member/entity/member'
import { AbstractEntityRepository } from './abstract.entity.repository'

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
export class MemberRepository2 extends AbstractEntityRepository<Member> {

  public async findQueryApplier(options: MemberFindAllOptions = {}) {
    const { where, skip, take } = options

    const qb = this.repository
    .createQueryBuilder('member')
    .leftJoinAndSelect('member.team', 'team')
    // .leftJoinAndSelect('Member.name', 'name')

    this.queryApplier.apply({
      qb,
      where,
      buildWhereOptions: ({ filterQuery, where }) => {
        const { id, email, name } = where

        if (id)filterQuery(`member.id = ${id}`)
        if (email)filterQuery(`member.email = "${email}"`) // 문자열은 큰 따옴표로 감싸줘야 합니다.
        if (name)filterQuery(`member.name = "${name}"`)
      },
    })

    // qb.skip(skip ?? 0)
    // qb.skip(take ?? 20)

    const [items, total] = await qb.getManyAndCount()

    console.log({items, total});

    return { items, total }
  }
}