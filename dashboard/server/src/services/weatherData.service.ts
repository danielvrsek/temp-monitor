import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { CreateWeatherDataDto } from './dto/weatherData.dto';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';

@Injectable()
export class WeatherDataService {
    constructor(@InjectModel(SchemaConstants.WeatherData) private readonly model: Model<WeatherData>) {}

    async createAsync(item: CreateWeatherDataDto): Promise<WeatherData> {
        // TODO: authenticate gateway and add timestamp
        const newItem = new this.model(item);
        return await newItem.save();
    }

    async deleteAsync(id: string): Promise<WeatherData> {
        return await this.model.findByIdAndRemove(id);
    }

    async updateAsync(id: string, item: WeatherData): Promise<WeatherData> {
        return await this.model.findByIdAndUpdate(id, item, {
            new: true,
        });
    }
}
