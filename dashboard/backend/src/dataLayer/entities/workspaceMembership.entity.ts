import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { UserRole } from 'dataLayer/entities/enums/role.enum';

@Schema({ timestamps: true })
export class WorkspaceMembership {
    _id: Types.ObjectId;

    @Prop() roles: UserRole[];

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.Workspace })
    workspaceId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.User })
    userId: Types.ObjectId;
}

export const WorkspaceMembershipSchema = SchemaFactory.createForClass(WorkspaceMembership);
