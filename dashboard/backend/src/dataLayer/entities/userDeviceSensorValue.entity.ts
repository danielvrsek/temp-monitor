import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { Entity } from './entity';

@Schema()
export class UserDeviceSensorValue extends Entity {
    @Prop() value: number;
    @Prop() timestamp: number;

    @Prop({ type: Types.ObjectId, ref: Entities.UserDeviceSensor })
    userDeviceSensorId: Types.ObjectId;
}

export const UserDeviceSensorValueSchema = SchemaFactory.createForClass(UserDeviceSensorValue);
