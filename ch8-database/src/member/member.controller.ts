import {Controller, Get, Logger, Param} from '@nestjs/common';
import {MemberService} from "./member.service";
import {MemberInfo} from "./MemberInfo";
import {MemberView} from "./entity/member.view";

@Controller('member')
export class MemberController {

  private readonly loggers = new Logger(MemberController.name);

  constructor(
      private memberService: MemberService,
  ) { }

  @Get('')
  async getUserId(@Param('id') id:string): Promise<MemberInfo> {
    this.loggers.log("~~~~~~~~~~~~~~~~~~~~~~###~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    this.loggers.log("id : ", id);

    return await this.memberService.findOneByUserId(id);
  }

  @Get('/many')
  async findManyToMany(@Param('id') id:string): Promise<MemberInfo> {
    this.loggers.log("~~~~~~~~~~~~~~~~~~~~~~###~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    this.loggers.log("id : ", id);

    return await this.memberService.findManyToMany(id);
  }

  @Get('/query')
  async findQueryBuilder(@Param('id') id:string): Promise<MemberInfo> {
    this.loggers.log("~~~~~~~~~~~~~~~~~~~~~~###~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    this.loggers.log("id : ", id);

    return await this.memberService.findQueryBuilder(id);
  }

  @Get('/view')
  async findViewEntity(@Param('id') id:string): Promise<MemberView> {
    this.loggers.log("~~~~~~~~~~~~~~~~~~~~~~###~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    this.loggers.log("id : ", id);

    return await this.memberService.findViewEntity(id);
  }
}
