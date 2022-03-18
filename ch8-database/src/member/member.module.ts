import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Team} from './entity/team';
import {Member} from './entity/member';
import {MemberController} from "./member.controller";
import {MemberService} from "./member.service";
import {MemberView} from "./entity/member.view";
import {MemberRepository} from "./repository/member.repository";
import {MemberRepository2} from "./repository/member.repository2";

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, Member, MemberView, MemberRepository, MemberRepository2]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule { }
