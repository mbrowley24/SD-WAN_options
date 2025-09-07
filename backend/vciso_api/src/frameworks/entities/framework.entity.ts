import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type FrameworkDocument = Framework & Document;

@Schema({timestamps: true})
export class Framework {

    @Prop({type: String, required:true})
    name: string;

    @Prop({type: String, required:true})
    version: string;

    @Prop({type: String, required:true})
    functionsCode:string;

    @Prop({type: String, required:true})
    functionName:string;

    @Prop({type: String, required:true, default:''})
    functionDescription:string;

    @Prop({type: String, required:true})
    categoryCode: string;

    @Prop({type: String, required:true})
    categoryName : string;

    @Prop({type: String, required:true})
    categoryDescription : string;

    @Prop({type: String ,required:true})
    controlCode : string;

    @Prop({type: String ,required:true})
    controlDescription : string;


    @Prop({type:[Object]})
    mappings?: Array<{
        framework    : string;
        control_id   : string;
        description? : string;
    }>;


}

export const FrameworkSchema = SchemaFactory.createForClass(Framework);
