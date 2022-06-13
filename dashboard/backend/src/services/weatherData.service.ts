import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { objectId } from 'utils/schemaHelper';
import { InsertWeatherDataDto } from 'shared/dto';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';

@Injectable()
export class WeatherDataService {
    private unitOfWork: UnitOfWork<WeatherData>;

    constructor(unitOfWorkFactory: UnitOfWorkFactory) {
        this.unitOfWork = unitOfWorkFactory.create<WeatherData>(SchemaConstants.WeatherData);
    }
    async insertAsync(gatewayId: Types.ObjectId, dto: InsertWeatherDataDto): Promise<number> {
        const length = dto.data.length;
        await this.unitOfWork.insertManyAsync(dto.data.map((data) => ({ gatewayId: objectId(gatewayId), ...data })));

        return length;
    }

    sortWeatherData(data: WeatherData[]): WeatherData[] {
        return data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
}
