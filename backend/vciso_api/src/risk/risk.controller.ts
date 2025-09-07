import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus} from '@nestjs/common';
import { RiskService } from './risk.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';

@Controller('risk')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Post()
  create(@Body() createRiskDto: CreateRiskDto) {

    const errors = this.riskService.checkNewRisk(createRiskDto);

    if (Object.keys(errors).length > 0) {
      return {
        errors: errors,
        status: HttpStatus.BAD_REQUEST,
      }
    }

    const newRiskDocument = this.riskService.create(createRiskDto);



    return {
      "message": "successfully created risk",
      status: HttpStatus.CREATED,
    };
  }

  @Get()
  findAll() {
    return this.riskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskDto: UpdateRiskDto) {
    return this.riskService.update(+id, updateRiskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskService.remove(+id);
  }
}
