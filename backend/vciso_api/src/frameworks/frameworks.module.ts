import { Module } from '@nestjs/common';
import { Framework, FrameworkSchema } from "./entities/framework.entity";
import { FrameworksService } from './frameworks.service';
import { FrameworksController } from './frameworks.controller'
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Framework.name, schema: FrameworkSchema }]),
  ],
  controllers: [FrameworksController],
  providers: [FrameworksService],
})
export class FrameworksModule {}
