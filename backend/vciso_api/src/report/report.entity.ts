import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { PostureLevel, ReportStatus, ReportType } from "./data.types";

export type ReportDocument = Report & Document;

@Schema({timestamps: true})
export class Report {

    @Prop({required: true, unique: true})
    publicId: string;

    @Prop({ required: true, ref: "Organization" })
    OrgId: Types.ObjectId;

    @Prop({required: true, enum: ReportType })
    type: ReportType;

    @Prop({type: String, required: true, maxLength: 1000})
    title: string;

    @Prop({type: Date, required: true})
    periodStart: Date;

    @Prop({type: Date, required: true})
    periodEnd: Date;

    @Prop({required: true, enum: ReportStatus})
    status: ReportStatus;

    @Prop({required: true, enum: PostureLevel})
    overallPosture: PostureLevel;

    @Prop({type: String, required: true})
    execSummary: string;

    @Prop({type: Object, required: true, default:{ critical:0, high:0, medium:0, low:0 }})
    severityCounts:{critical:number, high:number, medium:number, low:number};



}

export const ReportSchema = SchemaFactory.createForClass(Report);
