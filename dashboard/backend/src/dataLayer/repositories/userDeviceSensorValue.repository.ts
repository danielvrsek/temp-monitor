import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/entities';
import * as dateFns from 'date-fns';
import { Repository } from './respository';
import { UserDeviceSensorValue } from 'dataLayer/entities/userDeviceSensorValue.entity';

@Injectable()
export class UserDeviceSensorValueRepository extends Repository<UserDeviceSensorValue> {
    constructor(@InjectModel(Entities.UserDeviceSensorValue) model: Model<UserDeviceSensorValue>) {
        super(model, false);
    }

    async findAllAsync(): Promise<UserDeviceSensorValue[]> {
        return super.findAllAsync();
    }

    async findAllBySensorIdAsync(
        userDeviceSensorId: Types.ObjectId,
        dateFrom?: Date,
        dateTo?: Date
    ): Promise<UserDeviceSensorValue[]> {
        return await super.findAsync({
            userDeviceSensorId,
            timestamp: {
                $gte: dateFrom ? dateFns.startOfDay(dateFrom).getTime() : -8640000000000000,
                $lte: dateTo ? dateFns.endOfDay(dateTo).getTime() : 8640000000000000,
            },
        });
    }
}
