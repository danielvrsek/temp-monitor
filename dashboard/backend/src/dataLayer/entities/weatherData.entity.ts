import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class WeatherData {
    _id: Types.ObjectId;

    @Prop() humidity: number;
    @Prop() temperature: number;
    @Prop() timestamp: Date;

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.Gateway })
    gatewayId: Types.ObjectId;
}

export const WeatherDataSchema = SchemaFactory.createForClass(WeatherData);
