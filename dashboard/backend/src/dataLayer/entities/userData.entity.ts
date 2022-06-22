import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { Entity } from './entity';

@Schema()
export class UserData extends Entity {
    @Prop() value: number;
    @Prop() timestamp: Date;

    @Prop({ type: Types.ObjectId, ref: Entities.UserDataGroup })
    userDataGroupId: Types.ObjectId;
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
