import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types} from "mongoose";

export type StatusDocument = Status & Document;

@Schema({ timestamps: true })
export class Status {

    @Prop({ required: true })
    public_id: string;

    @Prop({ required: true })
    public name: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);



