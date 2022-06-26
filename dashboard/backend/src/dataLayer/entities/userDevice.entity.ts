import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/entities';
import { Types } from 'mongoose';
import { Entity } from './entity';

@Schema({ timestamps: true })
export class UserDevice extends Entity {
    @Prop() name: string;
    @Prop() externalId: string;
    @Prop() createdAt?: Date;

    @Prop({ type: Types.ObjectId, ref: Entities.Gateway })
    gatewayId: Types.ObjectId;
}

export const UserDeviceSchema = SchemaFactory.createForClass(UserDevice);
