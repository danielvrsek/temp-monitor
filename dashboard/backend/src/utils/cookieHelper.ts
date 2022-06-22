import { UserRequest } from 'common/request';
import { Cookies } from '../common/cookies';
import { objectId } from './schemaHelper';
import { Types } from 'mongoose';

export class CookieHelper {
    async getCurrentUserWorkspaceIdAsync<TPayload>(request: UserRequest<TPayload>): Promise<Types.ObjectId> {
        const workspaceId = request.cookies[Cookies.CurrentWorkspace];
        if (!workspaceId) {
            return undefined;
        }

        return objectId(workspaceId);
    }
}
