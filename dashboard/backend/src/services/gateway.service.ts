import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { GatewayAuthorization } from 'dataLayer/entities/gatewayAuthorization.entity';
import { CryptoHelper } from 'utils/cryptoHelper';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { objectId } from 'utils/schemaHelper';
import { CreateGatewayDto, CreateGatewayResult, GatewayViewModel, UpdateGatewayDto } from 'shared/src/dto';
import { GatewayMapper } from 'mappers/gateway.mapper';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { GatewayAuthorizationType } from 'dataLayer/entities/enums/gatewayAuthorizationType';

@Injectable()
export class GatewayService {
    constructor(
        @InjectModel(SchemaConstants.Gateway) private readonly model: Model<Gateway>,
        @InjectModel(SchemaConstants.GatewayAuthorization)
        private readonly authorizationModel: Model<GatewayAuthorization>,
        private readonly gatewayAuthorizationRepository: GatewayAuthorizationRepository,
        private readonly gatewayRepository: GatewayRepository,
        private readonly cryptoHelper: CryptoHelper
    ) {}

    async createAsync(workspaceId: Types.ObjectId, createDto: CreateGatewayDto): Promise<CreateGatewayResult> {
        const gateway = await new this.model({
            name: createDto.name,
            state: GatewayState.Created,
        }).save();

        const secret = this.cryptoHelper.generatePassword(12);
        await new this.authorizationModel({
            secret,
            gatewayId: gateway._id,
            workspaceId,
            authorizationType: GatewayAuthorizationType.Master,
        }).save();

        return { gateway: GatewayMapper.mapToViewModel(gateway), secret };
    }

    async createWithIdAsync(
        workspaceId: Types.ObjectId,
        createDto: CreateGatewayDto & { _id: Types.ObjectId }
    ): Promise<GatewayViewModel> {
        const gateway = await new this.model({
            _id: createDto._id,
            name: createDto.name,
            state: GatewayState.Created,
        }).save();

        const secret = this.cryptoHelper.generatePassword(12);
        await new this.authorizationModel({
            secret,
            gatewayId: gateway._id,
            workspaceId,
            authorizationType: GatewayAuthorizationType.Master,
        }).save();

        return GatewayMapper.mapToViewModel(gateway);
    }

    async addSlaveToWorkspace(workspaceId: Types.ObjectId, gatewayId: Types.ObjectId): Promise<GatewayAuthorization> {
        return await new this.authorizationModel({
            gatewayId,
            workspaceId,
            authorizationType: GatewayAuthorizationType.Slave,
            secret: null,
        }).save();
    }

    async removeFromWorkspace(workspaceId: Types.ObjectId, gatewayId: Types.ObjectId): Promise<Types.ObjectId> {
        const authorization = await this.gatewayAuthorizationRepository.getForGatewayByWorkspace(
            workspaceId,
            gatewayId
        );
        if (!authorization) {
            return null;
        }

        await this.authorizationModel.deleteOne({ _id: authorization._id });
        return authorization._id;
    }

    async getAllGatewaysForWorkspace(workspaceId: Types.ObjectId) {
        const authorizations = await this.gatewayAuthorizationRepository.findAllByWorkspaceAsync(objectId(workspaceId));
        return await this.gatewayRepository.findAllByIdAsync(authorizations.map((x) => x.gatewayId));
    }

    async deleteAsync(id: Types.ObjectId): Promise<WeatherData> {
        return await this.model.findByIdAndRemove(id);
    }

    async updateAsync(id: Types.ObjectId, item: UpdateGatewayDto): Promise<WeatherData> {
        const entity: Gateway = {
            _id: id,
            name: item.name,
            state: GatewayMapper.mapGatewayStateFromDto(item.state),
        };

        return await this.model.findByIdAndUpdate(id, entity, {
            new: true,
        });
    }
}
