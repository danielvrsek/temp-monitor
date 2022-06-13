import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { WorkspaceMembership } from 'dataLayer/entities/workspaceMembership.entity';
import { WorkspaceMembershipRepository } from 'dataLayer/repositories/workspaceMembership.repository';
import { UserRole } from 'dataLayer/entities/enums/userRole.enum';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';

@Injectable()
export class WorkspaceMembershipService {
    private unitOfWork: UnitOfWork<WorkspaceMembership>;

    constructor(
        private readonly workspaceMembershipRepository: WorkspaceMembershipRepository,
        unitOfWorkFactory: UnitOfWorkFactory
    ) {
        this.unitOfWork = unitOfWorkFactory.create<WorkspaceMembership>(SchemaConstants.WorkspaceMembership);
    }

    addUserToWorkspaceAsync(workspaceId: Types.ObjectId, userId: Types.ObjectId, roles: UserRole[]) {
        return this.unitOfWork.insertAsync({
            workspaceId,
            userId,
            roles,
        });
    }

    async removeUserFromWorkspace(workspaceId: Types.ObjectId, userId: Types.ObjectId): Promise<Types.ObjectId> {
        const membership = await this.workspaceMembershipRepository.getMembershipForUserByWorkspaceAsync(
            userId,
            workspaceId
        );
        if (!membership) {
            return null;
        }

        return (await this.unitOfWork.deleteAsync(membership))._id;
    }
}
