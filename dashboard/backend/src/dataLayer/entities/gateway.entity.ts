import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entity } from './entity';
import { GatewayState } from './enums/gatewayState.enum';

@Schema({ timestamps: true })
export class Gateway extends Entity {
    @Prop() name: string;
    @Prop() state: GatewayState;
    @Prop() createdAt?: Date;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
