import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Team} from './entity/team';
import {Member} from './entity/member';
import {MemberController} from "./member.controller";
import {MemberService} from "./member.service";
import {MemberView} from "./entity/member.view";

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, Member, MemberView]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule { }
