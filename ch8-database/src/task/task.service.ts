import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {
    this.addCronJob();
  }

  /*// 초분시일월요일
  // @Cron('* * * * * *', { name: 'cronTask' })
  @Cron('* * * * * *', { name: 'cronTasks' })
  handleCron() {
    this.logger.log('Task Called');
  }

  //앱이 실행되고 3초 뒤에 3초마다
  @Interval('intervalTask', 3000)
  handleInterval() {
    this.logger.log('Task Called by interval');
  }

  //앱이 실행되고 5초뒤에 한번만 실행
  @Timeout('timeoutTask', 5000)
  handleTimeout() {
    this.logger.log('Task Called by Timeout');
  }*/

  addCronJob() {
    const name = 'cronSample';

    const job = new CronJob(`* * * * * *`, () => {
      this.logger.warn(`run! ${name}`);
    });

    this.schedulerRegistry.addCronJob(name, job);

    this.logger.warn(`job ${name} added!`);
  }
}