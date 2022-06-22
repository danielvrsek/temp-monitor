import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { Entity } from './entity';

@Schema()
export class UserDataGroup extends Entity {
    @Prop() name: number;

    @Prop({ type: Types.ObjectId, ref: Entities.Gateway })
    gatewayId: Types.ObjectId;
}

export const UserDataGroupSchema = SchemaFactory.createForClass(UserDataGroup);
