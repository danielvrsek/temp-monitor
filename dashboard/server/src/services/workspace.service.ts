import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkspaceDto } from './dto/workspace.dto';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import WorkspaceMembership from 'dataLayer/entities/workspaceMembership.entity';
import { Role } from 'dataLayer/entities/enums/role.enum';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectModel(SchemaConstants.Workspace) private readonly model: Model<Workspace>,
        @InjectModel(SchemaConstants.WorkspaceMembership) private readonly membershipModel: Model<WorkspaceMembership>
    ) {}

    async createAsync(item: CreateWorkspaceDto): Promise<Workspace> {
        const newItem = new this.model(item);
        return await newItem.save();
    }

    async deleteAsync(id: string): Promise<Workspace> {
        return await this.model.findByIdAndRemove(id);
    }

    async updateAsync(id: string, item: Workspace): Promise<Workspace> {
        return await this.model.findByIdAndUpdate(id, item, {
            new: true,
        });
    }

    async addUserToWorkspace(workspaceId: string, userId: string, roles: Role[]) {
        const newItem = new this.membershipModel({
            workspaceId: workspaceId,
            userId: userId,
            roles: roles,
        });
        return await newItem.save();
    }
}
