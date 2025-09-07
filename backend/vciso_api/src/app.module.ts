import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {HealthModule} from "./health/health.module";
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RiskModule } from './risk/risk.module';
import { CategoryModule } from './category/category.module';
import { StatusModule } from './status/status.module';
import { FrameworksModule } from './frameworks/frameworks.module';
import { AssessmentModule } from './assessment/assessment.module';
import { OrganizationModule } from './organization/organization.module';
import { ReportModule } from './report/report.module';
import { ReportFindingModule } from './report_finding/report_finding.module';




@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
              uri: config.get<string>('MONGODB_URI'),
          }),
          inject: [ConfigService],
      }),
      HealthModule,
      AuthModule,
      DashboardModule,
      RiskModule,
      CategoryModule,
      StatusModule,
      FrameworksModule,
      AssessmentModule,
      OrganizationModule,
      ReportModule,
      ReportFindingModule,
  ],
})
export class AppModule {}
