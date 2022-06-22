import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entity } from './entity';

@Schema({ timestamps: true })
export class User extends Entity {
    @Prop() firstName: string;
    @Prop() lastname: string;
    @Prop() email: string;
    @Prop() username: string;
    @Prop() passwordHash: string;
    @Prop() isExternal: boolean;
    @Prop() profilePhotoUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
