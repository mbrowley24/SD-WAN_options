import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type AssessmentDocument = Assessment & Document;

@Schema({timestamps: true})
export class Assessment {




}