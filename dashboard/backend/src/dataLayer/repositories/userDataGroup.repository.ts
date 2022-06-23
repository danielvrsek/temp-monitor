import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Repository } from './respository';
import { UserDataGroup } from 'dataLayer/entities/userDataGroup.entity';

@Injectable()
export class UserDataGroupRepository extends Repository<UserDataGroup> {
    constructor(@InjectModel(Entities.UserDataGroup) model: Model<UserDataGroup>) {
        super(model, false);
    }

    async findAllAsync(): Promise<UserDataGroup[]> {
        return super.findAllAsync();
    }

    async findAllByGatewayIdAsync(gatewayId: Types.ObjectId): Promise<UserDataGroup[]> {
        return await super.findAsync({ gatewayId });
    }
}
