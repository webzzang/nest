import { AbstractRepository, WhereExpression, Brackets, FindOperator } from 'typeorm'

export abstract class AbstractEntityRepository<T> extends AbstractRepository<T> {
  protected readonly queryApplier: EntityQueryApplier

  constructor() {
    super()
    this.queryApplier = new EntityQueryApplier()
  }
}

export interface BuildWhereOptionsFunction<T> {
  ({
     filterQuery,
     where,
   }: {
    filterQuery: (query: string) => void
    where: T
  }): void
}

export interface ApplyOptions<T> {
  qb: WhereExpression
  where?: T | T[]
  buildWhereOptions: BuildWhereOptionsFunction<T>
}

class EntityQueryApplier {
  public apply<T>({ qb, where, buildWhereOptions }: ApplyOptions<T>) {
    if (!where) return

    if (Array.isArray(where)) {
      qb.andWhere(
          new Brackets((qb) => {
            where.forEach((wh) => {
              qb.orWhere(
                  new Brackets((qb) => {
                    this.applyBuildOptions({ qb, where: wh, buildWhereOptions })
                  }),
              )
            })
          }),
      )
    } else {
      this.applyBuildOptions({ qb, where, buildWhereOptions })
    }
  }

  private applyBuildOptions<T>({
                                 qb,
                                 where,
                                 buildWhereOptions,
                               }: {
    qb: WhereExpression
    where: T
    buildWhereOptions: BuildWhereOptionsFunction<T>
  }) {
    buildWhereOptions({
      where,
      filterQuery: (query: string) => {
        qb.andWhere(query)
      },
    })
  }
}