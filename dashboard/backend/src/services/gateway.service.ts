import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { GatewayAuthorization } from 'dataLayer/entities/gatewayAuthorization.entity';
import { CryptoHelper } from 'utils/cryptoHelper';
import { GatewayAuthorizationRepository } from 'dataLayer/repositories/gatewayAuthorization.repository';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { objectId } from 'utils/schemaHelper';
import { CreateGatewayDto, CreateGatewayResult, GatewayViewModel, UpdateGatewayDto } from 'shared/dto';
import { GatewayMapper } from 'mappers/gateway.mapper';
import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { GatewayAuthorizationType } from 'dataLayer/entities/enums/gatewayAuthorizationType';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { Entities } from 'dataLayer/common/entities';

@Injectable()
export class GatewayService {
    private unitOfWork: UnitOfWork<Gateway>;
    private gatewayAuthorizationUnitOfWork: UnitOfWork<GatewayAuthorization>;

    constructor(
        private readonly gatewayAuthorizationRepository: GatewayAuthorizationRepository,
        private readonly gatewayRepository: GatewayRepository,
        private readonly cryptoHelper: CryptoHelper,
        unitOfWorkFactory: UnitOfWorkFactory
    ) {
        this.unitOfWork = unitOfWorkFactory.create<Gateway>(Entities.Gateway);
        this.gatewayAuthorizationUnitOfWork = unitOfWorkFactory.create<GatewayAuthorization>(
            Entities.GatewayAuthorization
        );
    }

    async createAsync(workspaceId: Types.ObjectId, createDto: CreateGatewayDto): Promise<CreateGatewayResult> {
        const gateway = await this.unitOfWork.insertAsync({
            name: createDto.name,
            state: GatewayState.Created,
        });

        const secret = this.cryptoHelper.generatePassword(12);
        await this.gatewayAuthorizationUnitOfWork.insertAsync({
            secret,
            gatewayId: gateway._id,
            workspaceId,
            authorizationType: GatewayAuthorizationType.Master,
        });

        return { gateway: GatewayMapper.mapToViewModel(gateway), secret };
    }

    async createWithIdAsync(
        workspaceId: Types.ObjectId,
        createDto: CreateGatewayDto & { _id: Types.ObjectId }
    ): Promise<CreateGatewayResult> {
        const gateway = await this.unitOfWork.insertAsync({
            _id: createDto._id,
            name: createDto.name,
            state: GatewayState.Created,
        });

        const secret = this.cryptoHelper.generatePassword(12);
        await this.gatewayAuthorizationUnitOfWork.insertAsync({
            secret,
            gatewayId: gateway._id,
            workspaceId,
            authorizationType: GatewayAuthorizationType.Master,
        });

        return { gateway: GatewayMapper.mapToViewModel(gateway), secret };
    }

    async addSlaveToWorkspace(workspaceId: Types.ObjectId, gatewayId: Types.ObjectId): Promise<GatewayAuthorization> {
        return await this.gatewayAuthorizationUnitOfWork.insertAsync({
            gatewayId,
            workspaceId,
            authorizationType: GatewayAuthorizationType.Slave,
            secret: null,
        });
    }

    async removeFromWorkspace(workspaceId: Types.ObjectId, gatewayId: Types.ObjectId): Promise<Types.ObjectId> {
        const authorization = await this.gatewayAuthorizationRepository.getForGatewayByWorkspace(
            workspaceId,
            gatewayId
        );
        if (!authorization) {
            return null;
        }

        await this.gatewayAuthorizationUnitOfWork.deleteAsync(authorization);
        return authorization._id;
    }

    async getAllGatewaysForWorkspace(workspaceId: Types.ObjectId) {
        const authorizations = await this.gatewayAuthorizationRepository.findAllByWorkspaceAsync(objectId(workspaceId));
        return await this.gatewayRepository.findAllByIdAsync(authorizations.map((x) => x.gatewayId));
    }

    async updateAsync(id: Types.ObjectId, item: UpdateGatewayDto): Promise<Gateway> {
        return await this.unitOfWork.updateWithCallbackAsync(id, (entity) => {
            entity.name = item.name;
            entity.state = GatewayMapper.mapGatewayStateFromDto(item.state);
        });
    }
}
