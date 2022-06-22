import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { UserRole } from './enums/userRole.enum';
import { Entity } from './entity';

@Schema({ timestamps: true })
export class WorkspaceMembership extends Entity {
    @Prop() roles: UserRole[];

    @Prop({ type: Types.ObjectId, ref: Entities.Workspace })
    workspaceId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Entities.User })
    userId: Types.ObjectId;
}

export const WorkspaceMembershipSchema = SchemaFactory.createForClass(WorkspaceMembership);
