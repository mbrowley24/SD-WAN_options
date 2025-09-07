import { Module } from '@nestjs/common';
import { MongooseModule} from "@nestjs/mongoose";
import { Risk, RiskSchema } from "./entities/risk.entity";
import { RiskService } from './risk.service';
import { RiskController } from './risk.controller';

@Module({
  imports:[
      MongooseModule.forFeature([{ name: Risk.name, schema: RiskSchema }]),
  ],
  controllers: [RiskController],
  providers: [RiskService],
})
export class RiskModule {}
