import {ViewColumn, ViewEntity} from "typeorm";

@ViewEntity({
  expression: `
        SELECT "m"."id" AS "id", "m"."name" AS "name", "t"."description" AS "description"
        FROM "member" "m"
        LEFT JOIN "team" "t" ON "t"."id" = "m"."team_id"
    `
})
export class MemberView {
  @ViewColumn()
  id: number

  @ViewColumn()
  name: string

  @ViewColumn()
  description: string
}