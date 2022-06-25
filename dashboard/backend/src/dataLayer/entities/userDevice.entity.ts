import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { Entity } from './entity';

@Schema()
export class UserDevice extends Entity {
    @Prop() name: string;

    @Prop({ type: Types.ObjectId, ref: Entities.Gateway })
    gatewayId: Types.ObjectId;
}

export const UserDeviceSchema = SchemaFactory.createForClass(UserDevice);
