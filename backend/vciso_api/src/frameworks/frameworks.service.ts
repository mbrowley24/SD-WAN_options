import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { CreateFrameworkDto } from './dto/create-framework.dto';
import { Framework, FrameworkDocument } from "./entities/framework.entity";
import { Model } from "mongoose";
import { promises as fs } from 'fs';
import * as path from 'path';
import { UpdateFrameworkDto } from './dto/update-framework.dto';
import * as process from "node:process";

@Injectable()
export class FrameworksService implements OnModuleInit {

  constructor(@InjectModel(Framework.name) private readonly frameworkModel: Model<FrameworkDocument>) {
  }

  async onModuleInit(): Promise<void> {

    await this.loadCSFFrameworks();
  }


  async loadCSFFrameworks(){

    const csfFilePath = path.join(process.cwd(), 'data', 'CSF.json');
    const fileData = await fs.readFile(csfFilePath, 'utf8');
    const csfJsonData = JSON.parse(fileData);

    const frameworkName = "NIST CSF";
    const version = "2.0"

    for(let i=0; i<csfJsonData.length; i++){

      const categories = [...csfJsonData[i]['categories']];

      const functionName = csfJsonData[i]['name'];
      const functionId = csfJsonData[i]['code'];

      for(let j = 0; j < categories.length; j++){

        const categoryName = categories[j]['name'];
        const categoryId = categories[j]['code'];

        const subCategories = [...categories[j]['sub_categories']];

        for(let k = 0; k < subCategories.length; k++){

          const controlId = subCategories[k]['name'];
          const controlName = subCategories[k]['description'];


          const controlExists = await  this.existsByControlId(controlId);

          if(controlExists){
            console.log("break");
            continue;
          }

          const framework = new this.frameworkModel({
            framework:{
              name: frameworkName,
              version: version,
            },
            function:{
              id: functionId,
              name: functionName,
            },
            category:{
              id: categoryId,
              name: categoryName,
            },
            control:{
              id: controlId,
              name: controlName,
            }

          });

          const savedFramework = await framework.save();

          console.log("saved framework");
          console.log(savedFramework);
        }

      }
    }
  }


  create(createFrameworkDto: CreateFrameworkDto) {
    return 'This action adds a new framework';
  }

  exists(createFrameworkDto: CreateFrameworkDto) {

  }

  async existsByControlId(controlId: string): Promise<boolean> {

    const exists = await this.frameworkModel.exists({'control.id': controlId});

    return !!exists;

  }

  findAll() {
    return `This action returns all frameworks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} framework`;
  }


  update(id: number, updateFrameworkDto: UpdateFrameworkDto) {
    return `This action updates a #${id} framework`;
  }

  remove(id: number) {
    return `This action removes a #${id} framework`;
  }
}
