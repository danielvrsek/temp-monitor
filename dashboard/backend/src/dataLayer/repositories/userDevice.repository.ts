import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Repository } from './respository';
import { UserDevice } from 'dataLayer/entities/userDevice.entity';

@Injectable()
export class UserDeviceRepository extends Repository<UserDevice> {
    constructor(@InjectModel(Entities.UserDevice) model: Model<UserDevice>) {
        super(model, false);
    }

    async findAllAsync(): Promise<UserDevice[]> {
        return super.findAllAsync();
    }

    async findAllByGatewayIdAsync(gatewayId: Types.ObjectId): Promise<UserDevice[]> {
        return await super.findAsync({ gatewayId });
    }
}
