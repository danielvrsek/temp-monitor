import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { objectId } from 'utils/schemaHelper';
import { InsertWeatherDataDto } from 'shared/dist/dto';

@Injectable()
export class WeatherDataService {
    constructor(@InjectModel(SchemaConstants.WeatherData) private readonly model: Model<WeatherData>) {}

    async insertAsync(gatewayId: Types.ObjectId, dto: InsertWeatherDataDto): Promise<number> {
        const length = dto.data.length;
        await this.model.insertMany(
            dto.data.map((data) => new this.model({ gatewayId: objectId(gatewayId), ...data }))
        );

        return length;
    }

    sortWeatherData(data: WeatherData[]): WeatherData[] {
        return data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
}
