import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Entities } from './common/entities';
import { Entity } from './entities/entity';
import { Gateway } from './entities/gateway.entity';
import { GatewayAuthorization } from './entities/gatewayAuthorization.entity';
import { User } from './entities/user.entity';
import { UserDevice } from './entities/userDevice.entity';
import { UserDeviceSensor } from './entities/userDeviceSensor.entity';
import { UserDeviceSensorValue } from './entities/userDeviceSensorValue.entity';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMembership } from './entities/workspaceMembership.entity';
import { entityNameWeakMap } from './entityNameWeakMap';

type ModelStore = { [name: string]: Model<any> };
type UpdateCallback<T> = (entity: T) => void;

@Injectable()
export class UnitOfWorkFactory {
    private readonly modelStore: ModelStore = {};

    constructor(
        @InjectModel(Entities.Gateway) gatewayModel: Model<Gateway>,
        @InjectModel(Entities.GatewayAuthorization) gatewayAuthorizationModel: Model<GatewayAuthorization>,
        @InjectModel(Entities.User) userModel: Model<User>,
        @InjectModel(Entities.UserDevice) userDeviceModel: Model<UserDevice>,
        @InjectModel(Entities.UserDeviceSensor) userDeviceSensorModel: Model<UserDeviceSensor>,
        @InjectModel(Entities.UserDeviceSensorValue) userDeviceSensorValueModel: Model<UserDeviceSensorValue>,
        @InjectModel(Entities.Workspace) workspaceModel: Model<Workspace>,
        @InjectModel(Entities.WorkspaceMembership) workspaceMembershipModel: Model<WorkspaceMembership>
    ) {
        this.#pushModel(gatewayModel);
        this.#pushModel(gatewayAuthorizationModel);
        this.#pushModel(userModel);
        this.#pushModel(userDeviceModel);
        this.#pushModel(userDeviceSensorModel);
        this.#pushModel(userDeviceSensorValueModel);
        this.#pushModel(workspaceModel);
        this.#pushModel(workspaceMembershipModel);
    }

    create<T extends Entity>(entityType: Entities): UnitOfWork<T> {
        return new UnitOfWork(this.modelStore[entityType], this.modelStore);
    }

    #pushModel(model: Model<any>) {
        this.modelStore[model.modelName] = model;
    }
}

export class UnitOfWork<T extends Entity> {
    constructor(private readonly defaultModel: Model<T>, private readonly modelStore: ModelStore) {}

    async insertAsync(entity: T): Promise<T> {
        const entityModel = this.#getEntityModel(entity);
        return await new entityModel({ ...entity }).save();
    }

    insertManyAsync(entities: T[]): Promise<T[]> {
        const entityModel = this.#getEntityModel(null);
        return entityModel.insertMany(entities);
    }

    async updateAsync(entity: T): Promise<T> {
        const entityModel = this.#getEntityModel(entity);
        return await entityModel.findByIdAndUpdate(entity._id, entity, {
            new: true,
        });
    }

    async updateWithCallbackAsync(id: Types.ObjectId, callback: UpdateCallback<T>): Promise<T> {
        const entityModel = this.#getEntityModel(null);
        const entity = await entityModel.findById(id);
        callback(entity);

        return await entityModel.findByIdAndUpdate(id, entity, {
            new: true,
        });
    }

    async deleteByIdAsync(id: Types.ObjectId): Promise<T> {
        const entityModel = this.#getEntityModel(null);
        return await entityModel.findByIdAndRemove(id);
    }

    async deleteAsync(entity: T): Promise<T> {
        const entityModel = this.#getEntityModel(entity);
        return await entityModel.findByIdAndRemove(entity._id);
    }

    #getEntityModel(entity: T): Model<any> {
        if (!entity || !entityNameWeakMap.has(entity)) {
            return this.defaultModel;
        }

        const entityName = entityNameWeakMap.get(entity)['entityName'] as string;
        return this.modelStore[entityName];
    }
}
