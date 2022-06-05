import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';

@Injectable()
export class WorkspaceRepository {
    constructor(
        @InjectModel(SchemaConstants.Workspace)
        private readonly model: Model<Workspace>
    ) {}

    async findAllAsync(): Promise<Workspace[]> {
        return await this.model.find();
    }

    async findAllForUserAsync(userId: Types.ObjectId): Promise<Workspace[]> {
        return await this.model.find({ userId });
    }

    async findByIdAsync(id: Types.ObjectId): Promise<Workspace> {
        const workspace = await this.model.findOne({ _id: id });
        return workspace ? workspace : null;
    }
}
