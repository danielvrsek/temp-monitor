/* eslint-disable no-console */
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from 'services/user.service';
import { WorkspaceService } from 'services/workspace.service';
import { GatewayService } from 'services/gateway.service';
import { WorkspaceType } from 'dataLayer/entities/enums/workspaceType.enum';
import { UserRole } from 'dataLayer/entities/enums/userRole.enum';
import { WorkspaceMembershipService } from 'services/workspaceMembership.service';
import { UserDeviceService } from 'services/userDevice.service';
import { UserDeviceSensorService } from 'services/userDeviceSensor.service';

@Injectable()
export class SeedCommand {
    constructor(
        private readonly userService: UserService,
        private readonly userDeviceService: UserDeviceService,
        private readonly userDeviceSensorService: UserDeviceSensorService,
        private readonly workspaceService: WorkspaceService,
        private readonly workspaceMembershipService: WorkspaceMembershipService,
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
                name: 'Daniel Vršek',
            },
            WorkspaceType.Private
        );
        console.log(workspace1);

        const workspaceMembership1 = await this.workspaceMembershipService.addUserToWorkspaceAsync(
            adminWorkspace._id,
            superAdmin._id,
            [UserRole.Admin]
        );
        console.log(workspaceMembership1);

        const workspaceMembership2 = await this.workspaceMembershipService.addUserToWorkspaceAsync(
            workspace1._id,
            user1._id,
            [UserRole.User]
        );
        console.log(workspaceMembership2);

        const workspaceMembership3 = await this.workspaceMembershipService.addUserToWorkspaceAsync(
            workspace1._id,
            user2._id,
            [UserRole.Admin]
        );
        console.log(workspaceMembership3);

        const gateway1 = await this.gatewayService.createAsync(workspace1._id, {
            name: 'VRSEK-PC',
        });
        console.log(gateway1);

        const userDevice1 = await this.userDeviceService.createAsync({
            gatewayId: gateway1.gateway.id,
            name: 'HDD1',
        });
        console.log(userDevice1);

        const userDevice2 = await this.userDeviceService.createAsync({
            gatewayId: gateway1.gateway.id,
            name: 'SSD1',
        });
        console.log(userDevice2);

        const userDeviceSensor1 = await this.userDeviceSensorService.createAsync({
            userDeviceId: userDevice1._id.toString(),
            name: 'Temperature',
            valueUnit: '°C',
        });
        console.log(userDeviceSensor1);
    }
}
