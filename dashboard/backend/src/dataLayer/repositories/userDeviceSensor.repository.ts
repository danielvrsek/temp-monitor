import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/entities';
import { Repository } from './respository';
import { UserDeviceSensor } from 'dataLayer/entities/userDeviceSensor.entity';

@Injectable()
export class UserDeviceSensorRepository extends Repository<UserDeviceSensor> {
    constructor(@InjectModel(Entities.UserDeviceSensor) model: Model<UserDeviceSensor>) {
        super(model, false);
    }

    async findAllAsync(): Promise<UserDeviceSensor[]> {
        return super.findAllAsync();
    }

    async findAllByDeviceIdAsync(userDeviceId: Types.ObjectId): Promise<UserDeviceSensor[]> {
        return await super.findAsync({ userDeviceId });
    }
}
