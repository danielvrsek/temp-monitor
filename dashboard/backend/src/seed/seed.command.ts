/* eslint-disable no-console */
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from 'services/user.service';
import { WorkspaceService } from 'services/workspace.service';
import { UserRole } from 'dataLayer/entities/enums/role.enum';
import { GatewayService } from 'services/gateway.service';
import { WorkspaceType } from 'dataLayer/entities/enums/workspaceType.enum';
import { objectId } from 'utils/schemaHelper';

@Injectable()
export class SeedCommand {
    constructor(
        private readonly userService: UserService,
        private readonly workspaceService: WorkspaceService,
        private readonly gatewayService: GatewayService
    ) {}

    @Command({ command: 'seed', describe: 'Seed data' })
    async seedAsync() {
        const superAdmin = await this.userService.createAsync({
            firstName: 'Super',
            lastname: 'Admin',
            email: 'super@admin.com',
            username: 'superadmin',
            passwordRaw: 'superadmin',
            isExternal: false,
            profilePhotoUrl: null,
        });
        console.log(superAdmin);

        const user1 = await this.userService.createAsync({
            firstName: 'Test',
            lastname: 'User',
            email: 'user@user.com',
            username: 'user',
            passwordRaw: 'user',
            isExternal: false,
            profilePhotoUrl: null,
        });
        console.log(user1);

        const user2 = await this.userService.createAsync({
            firstName: 'Test',
            lastname: 'Admin',
            email: 'admin@admin.com',
            username: 'admin',
            passwordRaw: 'admin',
            isExternal: false,
            profilePhotoUrl: null,
        });
        console.log(user2);

        const adminWorkspace = await this.workspaceService.createAsync(
            {
                name: 'Admin workspace',
            },
            WorkspaceType.Admin
        );
        console.log(adminWorkspace);

        const workspace1 = await this.workspaceService.createAsync(
            {
                name: 'Default workspace',
            },
            WorkspaceType.Private
        );
        console.log(workspace1);

        const workspaceMembership1 = await this.workspaceService.addUserToWorkspaceAsync(
            adminWorkspace._id,
            superAdmin._id,
            [UserRole.Admin]
        );
        console.log(workspaceMembership1);

        const workspaceMembership2 = await this.workspaceService.addUserToWorkspaceAsync(workspace1._id, user1._id, [
            UserRole.User,
        ]);
        console.log(workspaceMembership2);

        const workspaceMembership3 = await this.workspaceService.addUserToWorkspaceAsync(workspace1._id, user2._id, [
            UserRole.Admin,
        ]);
        console.log(workspaceMembership3);

        const gateway1 = await this.gatewayService.createWithIdAsync(workspace1._id, {
            _id: objectId('629c75a8f54e0f35c1f6bc39'),
            name: 'Default gateway',
        });
        console.log(gateway1);
    }
}
