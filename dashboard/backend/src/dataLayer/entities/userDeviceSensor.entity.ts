import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/entities';
import { Types } from 'mongoose';
import { Entity } from './entity';

@Schema({ timestamps: true })
export class UserDeviceSensor extends Entity {
    @Prop() name: string;
    @Prop() valueUnit: string;
    @Prop() createdAt?: Date;

    @Prop({ type: Types.ObjectId, ref: Entities.UserDevice })
    userDeviceId: Types.ObjectId;
}

export const UserDeviceSensorSchema = SchemaFactory.createForClass(UserDeviceSensor);
