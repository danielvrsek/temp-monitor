import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Repository } from './respository';

@Injectable()
export class WorkspaceRepository extends Repository<Workspace> {
    constructor(@InjectModel(SchemaConstants.Workspace) model: Model<Workspace>) {
        super(model);
    }

    async findAllAsync(): Promise<Workspace[]> {
        return await super.findAllAsync();
    }

    async findAllByIdsAsync(workspaceIds: Types.ObjectId[]): Promise<Workspace[]> {
        return await super.findAsync({
            _id: {
                $in: workspaceIds,
            },
        });
    }

    async findAllForUserAsync(userId: Types.ObjectId): Promise<Workspace[]> {
        return await super.findAsync({ userId });
    }

    async findAllUsersAsync(userId: Types.ObjectId): Promise<Workspace[]> {
        return await super.findAsync({ userId });
    }

    async findByIdAsync(id: Types.ObjectId): Promise<Workspace> {
        const workspace = await super.findByIdAsync(id);
        return workspace ? workspace : null;
    }
}
