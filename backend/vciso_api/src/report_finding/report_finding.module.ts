import { Module } from '@nestjs/common';
import { ReportFindingController } from './report_finding.controller';
import { ReportFindingService } from './report_finding.service';

@Module({
  controllers: [ReportFindingController],
  providers: [ReportFindingService]
})
export class ReportFindingModule {}
