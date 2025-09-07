import { CreateRiskDto } from "../risk/dto/create-risk.dto";
import  { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { Status, StatusDocument } from "../status/entities/status.entity";


@Injectable()
export class StatusService {
    constructor(@Inject(Status.name) private readonly statusModel: Model<StatusDocument>) {}

    async create(createRiskDto: CreateRiskDto) {}
}