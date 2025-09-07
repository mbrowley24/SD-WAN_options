import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type OrganizationDocument = Organization & Document;

export enum ComplianceStandard{
    HIPPA = 'HIPPA',
    PCI_DSS = 'PCI_DSS',
    NIST_CSF = 'NIST_CSF',
    ISO_27001 = 'ISO_27001',
    CMMC = 'CMMC',
    SOC2 = 'SOC2',
}


@Schema({timestamps: true})
export class Organization {

    @Prop({type: String})
    name: string;

    @Prop({type: String, required: true})
    publicId: string;

    @Prop({type: String})
    industry?: string;

    @Prop({type: String})
    size?: string;

    @Prop({type: String, enum: ComplianceStandard})
    complianceNeeds?: string[]

    @Prop({type: [Types.ObjectId], required: true, ref: "User"})
    assigned_users: Types.ObjectId[];

    @Prop({type: Types.ObjectId, ref: "User"})
    owner: Types.ObjectId;

    @Prop({type: String, default: ''})
    description: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);