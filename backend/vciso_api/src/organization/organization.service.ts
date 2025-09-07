import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { MetaData } from "../common/utils/common-data-types";
import {Model, Types} from 'mongoose';
import {Organization, OrganizationDocument} from "./organization.schema";

@Injectable()
export class OrganizationService {
    constructor(@InjectModel(Organization.name) private orgModel: Model<OrganizationDocument>) {
    }

    async findOrganizationsByUserId(userId: string): Promise<OrganizationDocument[] | null> {

        const userObjectId = new Types.ObjectId(userId);


        return this.orgModel.find({
            $or: [
                {"assigned_users": userObjectId},
                {"created_by": userObjectId},
            ]
        });
    }


    async findOrganizationMetaDataByUserId(userId: string): Promise<MetaData[] | null> {

        const org_metadata: MetaData[] = [];

        const organizations  = await this.findOrganizationsByUserId(userId);

        //if null return type
        if(!organizations) {
            return org_metadata;
        }

        for(let i = 0; i < organizations.length; i++) {

            org_metadata.push({
                id   : organizations[i]['publicId'],
                name : organizations[i]['name'],
            })
        }

        return org_metadata;

    }
}
