import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { GatewayAuthorization } from 'dataLayer/entities/gatewayAuthorization.entity';
import { GatewayAuthorizationType } from 'dataLayer/entities/enums/gatewayAuthorizationType';

@Injectable()
export class GatewayAuthorizationRepository {
    constructor(@InjectModel(Entities.GatewayAuthorization) private readonly model: Model<GatewayAuthorization>) {}

    async getForGatewayByWorkspace(
        workspaceId: Types.ObjectId,
        gatewayId: Types.ObjectId
    ): Promise<GatewayAuthorization> {
        return await this.model.findOne({ workspaceId, gatewayId });
    }

    async findAllByWorkspaceAsync(workspaceId: Types.ObjectId): Promise<GatewayAuthorization[]> {
        return await this.model.find({ workspaceId });
    }

    async findBySecretAsync(workspaceId: Types.ObjectId, secret: string): Promise<GatewayAuthorization> {
        const gatewayAuthorization = await this.model.findOne({
            workspaceId,
            secret,
            authorizationType: GatewayAuthorizationType.Master,
        });
        if (!gatewayAuthorization) {
            return null;
        }

        return gatewayAuthorization;
    }
}
