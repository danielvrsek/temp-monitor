import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { Entity } from './entity';

@Schema()
export class UserDeviceSensor extends Entity {
    @Prop() name: string;
    @Prop() valueUnit: string;

    @Prop({ type: Types.ObjectId, ref: Entities.UserDevice })
    userDeviceId: Types.ObjectId;
}

export const UserDeviceSensorSchema = SchemaFactory.createForClass(UserDeviceSensor);
