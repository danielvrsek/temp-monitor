import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Types } from 'mongoose';
import { GatewayAuthorization } from 'dataLayer/entities/gatewayAuthorization.entity';

@Injectable()
export class GatewayAuthorizationRepository {
    constructor(
        @InjectModel(SchemaConstants.GatewayAuthorization) private readonly model: Model<GatewayAuthorization>
    ) {}

    async findAllByWorkspaceAsync(workspaceId: Types.ObjectId): Promise<GatewayAuthorization[]> {
        return await this.model.find({ workspaceId });
    }

    async findBySecretAsync(workspaceId: Types.ObjectId, secret: string): Promise<GatewayAuthorization> {
        const gatewayAuthorization = await this.model.findOne({ workspaceId, secret });
        if (!gatewayAuthorization) {
            return null;
        }

        return gatewayAuthorization;
    }
}
