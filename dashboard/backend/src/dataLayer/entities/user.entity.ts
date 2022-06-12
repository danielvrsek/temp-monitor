import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
    _id: Types.ObjectId;

    @Prop() firstName: string;
    @Prop() lastname: string;
    @Prop() email: string;
    @Prop() username: string;
    @Prop() passwordHash: string;
    @Prop() isExternal: boolean;
    @Prop() profilePhotoUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
