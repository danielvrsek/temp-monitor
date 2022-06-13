import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GatewayState } from './enums/gatewayState.enum';

@Schema({ timestamps: true })
export class Gateway {
    _id: Types.ObjectId;

    @Prop() name: string;
    @Prop() state: GatewayState;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
