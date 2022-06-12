import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkspaceDto } from './dto/workspace.dto';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { WorkspaceMembership } from 'dataLayer/entities/workspaceMembership.entity';
import { UserRole } from 'dataLayer/entities/enums/role.enum';
import { WorkspaceType } from 'dataLayer/entities/enums/workspaceType.enum';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectModel(SchemaConstants.Workspace) private readonly model: Model<Workspace>,
        @InjectModel(SchemaConstants.WorkspaceMembership) private readonly membershipModel: Model<WorkspaceMembership>,
        private readonly workspaceMembershipRepository: WorkspaceMembershipRepository
    ) {}

    async createAsync(item: CreateWorkspaceDto, workspaceType: WorkspaceType): Promise<Workspace> {
        const newItem = new this.model({ ...item, type: workspaceType });
        return await newItem.save();
    }

    async deleteAsync(id: Types.ObjectId): Promise<Workspace> {
        return await this.model.findByIdAndRemove(id);
    }

    async updateAsync(id: Types.ObjectId, item: Workspace): Promise<Workspace> {
        return await this.model.findByIdAndUpdate(id, item, {
            new: true,
        });
    }

    async addUserToWorkspaceAsync(workspaceId: Types.ObjectId, userId: Types.ObjectId, roles: UserRole[]) {
        const newItem = new this.membershipModel({
            workspaceId,
            userId,
            roles,
        });
        return await newItem.save();
    }

    async removeUserFromWorkspace(workspaceId: Types.ObjectId, userId: Types.ObjectId): Promise<Types.ObjectId> {
        const membership = await this.workspaceMembershipRepository.getMembershipForUserByWorkspaceAsync(
            userId,
            workspaceId
        );
        if (!membership) {
            return null;
        }

        await this.membershipModel.remove({ _id: membership._id });
        return membership._id;
    }
}
