import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type RiskDocument = Risk & Document;

@Schema({ timestamps: true } )
export class Risk {

    @Prop({trim:true, required: true, minLength: 5, maxLength: 120})
    title: string;

    @Prop({trim:true, minLength: 10, maxLength: 1000})
    description: string;

    @Prop({required:true, min: 1, max: 5,  default: 1})
    likelihood: number;

    @Prop({ required: true, min: 1, max: 5, default: 1 })
    impact: number;

    @Prop({ required: true, type: Types.ObjectId, ref: 'status'})
    status: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'category'})
    category: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'User'})
    owner: Types.ObjectId;

    @Prop({trim: true, maxlength: 2000})
    treatmentPlan: string;

    @Prop({ required: true })
    mitigationDeadline: Date;

    @Prop({ type: [Types.ObjectId], ref: 'Frameworks', default: [] })
    frameworks: Types.ObjectId[];

    @Prop({type:Number, min:1, max:5, default: 1})
    residualLikelihood?: number;

    @Prop({type:Number, min:1, max:5, default: 1})
    residualImpact?: number;

    @Prop({type: [String], default: []})
    tags: string[];

    @Prop({ default: [], type: [{ date: Date, change: String, changeBy: { type: Types.ObjectId, ref: 'User' } }] })
    history:{
        date: Date;
        change: string;
        changeBy: Types.ObjectId;
    }[];

    @Prop({required: true, type: Types.ObjectId, ref: 'User'})
    createdBy: Types.ObjectId;

    @Prop({required: true, type: Types.ObjectId, ref: 'Client'})
    clientId?: Types.ObjectId;

}


export const RiskSchema = SchemaFactory.createForClass(Risk);


RiskSchema.virtual("riskScore").get(function (this: Risk) {
    return this.likelihood * this.impact;
});

RiskSchema.virtual("residualRiskScore").get(function (this: Risk) {
    return ( this.residualLikelihood || 0 ) * (this.residualImpact || 0);
})
