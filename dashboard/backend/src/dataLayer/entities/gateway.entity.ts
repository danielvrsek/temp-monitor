import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Gateway {
    _id: Types.ObjectId;

    @Prop() name: string;
    @Prop() state: GatewayState;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
