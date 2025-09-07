import { CreateRiskDto } from './dto/create-risk.dto';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { Risk, RiskDocument } from "./entities/risk.entity";
import {Types} from "mongoose";

@Injectable()
export class RiskService {
  constructor(@InjectModel(Risk.name) private readonly riskModel: Model<RiskDocument>) {
  }

  async checkNewRisk(createRiskDto:CreateRiskDto): Promise<Record<string, string>> {
    const errors = {};

    if(createRiskDto.title.trim().length < 5){
      errors['title'] = 'title must have at least 5 characters';
    }

    if(createRiskDto.title.trim().length < 120){
      errors['title'] = 'title must have less than 120 characters';
    }

    if(createRiskDto.description.trim().length < 1000){
      errors['description'] = 'description must have less than 1000 characters';
    }


    if(createRiskDto.likelihood < 1 || createRiskDto.likelihood > 5){
      errors['likelihood'] = 'likelihood must be value 1 - 5';
    }

    if(createRiskDto.impact < 1 || createRiskDto.impact > 5){
      errors['impact'] = 'impact must be value 1 - 5';
    }

    if(!Types.ObjectId.isValid(createRiskDto.category)){

      errors['category'] = 'required';
    }

    if(!Types.ObjectId.isValid(createRiskDto.status)){
      errors['status'] = 'required';
    }

    if(!Types.ObjectId.isValid(createRiskDto.owner)){
      errors['owner'] = 'required';
    }

    if(createRiskDto.treatmentPlan.trim().length > 2000){
      errors['treatment_plan'] = 'required';
    }

    const date = new Date(createRiskDto.mitigationDeadline);
    if(!isNaN(date.getTime())){
        errors['mitigationDeadline'] = 'required';
    }

    return errors;
  }

  async create(createRiskDto: CreateRiskDto):Promise<RiskDocument>  {

    try{

      const statusId = new Types.ObjectId(createRiskDto.status);

      const newRisk = new this.riskModel({
        title: createRiskDto.title,
        description: createRiskDto.description,
        likelihood: createRiskDto.likelihood,
        impact: createRiskDto.impact,
        status: new Types.ObjectId(statusId),
        category: new Types.ObjectId(createRiskDto.category),
        owner: new Types.ObjectId(createRiskDto.owner),
        treatmentPlan : createRiskDto.treatmentPlan,
        mitigationDeadline : new Date(createRiskDto.mitigationDeadline),
        frameworks: [...createRiskDto.frameworks],
        residualLikelihood : createRiskDto.likelihood,
        residualImpact : createRiskDto.impact,
        tags: [...createRiskDto.tags],
        history: [],
        createdBy: new Types.ObjectId(createRiskDto.owner),
        clientId : new Types.ObjectId(createRiskDto.clientId),
      });

      return await newRisk.save();

    } catch (error) {

      throw new InternalServerErrorException("error saving risk");

    }




  }

  findAll() {
    return `This action returns all risk`;
  }

  findOne(id: number) {
    return `This action returns a #${id} risk`;
  }

  update(id: number, updateRiskDto: UpdateRiskDto) {
    return `This action updates a #${id} risk`;
  }

  remove(id: number) {
    return `This action removes a #${id} risk`;
  }
}
