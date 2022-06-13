import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { objectId } from 'utils/schemaHelper';
import * as dateFns from 'date-fns';
import { Repository } from './respository';

@Injectable()
export class WeatherDataRepository extends Repository<WeatherData> {
    constructor(@InjectModel(SchemaConstants.WeatherData) model: Model<WeatherData>) {
        super(model, false);
    }

    async findAllAsync(): Promise<WeatherData[]> {
        return super.findAllAsync();
    }

    async findAllByGatewayIdAsync(gatewayId: Types.ObjectId, dateFrom?: Date, dateTo?: Date): Promise<WeatherData[]> {
        return await super.findAsync({
            gatewayId: objectId(gatewayId),
            timestamp: {
                $gte: dateFrom ? dateFns.startOfDay(dateFrom) : new Date(-8640000000000000),
                $lte: dateTo ? dateFns.endOfDay(dateTo) : new Date(8640000000000000),
            },
        });
    }
}
