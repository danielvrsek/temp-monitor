import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Role } from 'dataLayer/entities/enums/role.enum';

@Schema({ timestamps: true })
export default class WorkspaceMembership {
    _id: string;

    @Prop() roles: Role[];

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.Workspace })
    workspaceId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.User })
    userId: Types.ObjectId;
}

export const WorkspaceMembershipSchema = SchemaFactory.createForClass(WorkspaceMembership);
