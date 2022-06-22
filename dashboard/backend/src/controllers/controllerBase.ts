import { BadRequestException } from '@nestjs/common';
import { UserRequest } from 'common/request';
import { User } from 'dataLayer/entities/user.entity';
import { Workspace } from 'dataLayer/entities/workspace.entity';
import { UserRepository } from 'dataLayer/repositories/user.repository';
import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { CookieHelper } from 'utils/cookieHelper';
import { objectId } from 'utils/schemaHelper';

export class ControllerBase {
    constructor(
        private readonly _cookieHelper?: CookieHelper,
        private readonly _workspaceRepository?: WorkspaceRepository,
        private readonly _userRepository?: UserRepository
    ) {}

    protected async getCurrentUserAsync<TPayload>(request: UserRequest<TPayload>): Promise<User> {
        const userId = request.user.userId;
        const user = await this._userRepository.findByIdAsync(objectId(userId));
        if (!user) {
            throw new BadRequestException('User does not exist.');
        }

        return user;
    }

    protected async getCurrentWorkspaceAsync<TPayload>(request: UserRequest<TPayload>): Promise<Workspace> {
        const workspaceId = await this._cookieHelper.getCurrentUserWorkspaceIdAsync(request);
        if (!workspaceId) {
            throw new BadRequestException('No workspace selected.');
        }

        const workspace = await this._workspaceRepository.findByIdAsync(workspaceId);
        if (workspace === null) {
            throw new BadRequestException('Workspace is invalid.');
        }

        return workspace;
    }
}
