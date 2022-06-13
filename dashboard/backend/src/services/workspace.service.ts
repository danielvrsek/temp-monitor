import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { WorkspaceType } from 'dataLayer/entities/enums/workspaceType.enum';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from 'shared/dto';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';

@Injectable()
export class WorkspaceService {
    private unitOfWork: UnitOfWork<Workspace>;

    constructor(unitOfWorkFactory: UnitOfWorkFactory) {
        this.unitOfWork = unitOfWorkFactory.create<Workspace>(SchemaConstants.Workspace);
    }
    createAsync(item: CreateWorkspaceDto, workspaceType: WorkspaceType): Promise<Workspace> {
        return this.unitOfWork.insertAsync({ ...item, type: workspaceType });
    }

    deleteAsync(id: Types.ObjectId): Promise<Workspace> {
        return this.unitOfWork.deleteByIdAsync(id);
    }

    updateAsync(id: Types.ObjectId, updateDto: UpdateWorkspaceDto): Promise<Workspace> {
        return this.unitOfWork.updateWithCallbackAsync(id, (workspace) => {
            workspace.name = updateDto.name;
        });
    }
}
