import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { WorkspaceMembership } from 'dataLayer/entities/workspaceMembership.entity';

@Injectable()
export class WorkspaceMembershipRepository {
    constructor(@InjectModel(SchemaConstants.WorkspaceMembership) private readonly model: Model<WorkspaceMembership>) {}

    async getMembershipForUserByWorkspaceAsync(
        userId: Types.ObjectId,
        workspaceId: Types.ObjectId
    ): Promise<WorkspaceMembership> {
        return await this.model.findOne({ userId, workspaceId });
    }

    async getAllMembershipsForUserAsync(userId: Types.ObjectId): Promise<WorkspaceMembership[]> {
        return await this.model.find({ userId });
    }

    async getAllMembershipsByWorkspaceAsync(workspaceId: Types.ObjectId): Promise<WorkspaceMembership[]> {
        return await this.model.find({ workspaceId });
    }
}
