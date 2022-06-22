import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserData } from 'dataLayer/entities/userData.entity';
import { Entities } from 'dataLayer/common/schemaConstants';
import { objectId } from 'utils/schemaHelper';
import * as dateFns from 'date-fns';
import { Repository } from './respository';

@Injectable()
export class UserDataRepository extends Repository<UserData> {
    constructor(@InjectModel(Entities.UserData) model: Model<UserData>) {
        super(model, false);
    }

    async findAllAsync(): Promise<UserData[]> {
        return super.findAllAsync();
    }

    async findAllByGatewayIdAsync(gatewayId: Types.ObjectId, dateFrom?: Date, dateTo?: Date): Promise<UserData[]> {
        return await super.findAsync({
            gatewayId: objectId(gatewayId),
            timestamp: {
                $gte: dateFrom ? dateFns.startOfDay(dateFrom) : new Date(-8640000000000000),
                $lte: dateTo ? dateFns.endOfDay(dateTo) : new Date(8640000000000000),
            },
        });
    }
}
