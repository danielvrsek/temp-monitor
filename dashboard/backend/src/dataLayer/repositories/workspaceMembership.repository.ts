import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { WorkspaceMembership } from 'dataLayer/entities/workspaceMembership.entity';
import { Repository } from './respository';

@Injectable()
export class WorkspaceMembershipRepository extends Repository<WorkspaceMembership> {
    constructor(@InjectModel(Entities.WorkspaceMembership) model: Model<WorkspaceMembership>) {
        super(model);
    }

    async getMembershipForUserByWorkspaceAsync(
        userId: Types.ObjectId,
        workspaceId: Types.ObjectId
    ): Promise<WorkspaceMembership> {
        return await this.findOneAsync({ userId, workspaceId });
    }

    async getAllMembershipsForUserAsync(userId: Types.ObjectId): Promise<WorkspaceMembership[]> {
        return await super.findAsync({ userId });
    }

    async getAllMembershipsByWorkspaceAsync(workspaceId: Types.ObjectId): Promise<WorkspaceMembership[]> {
        return await super.findAsync({ workspaceId });
    }
}
