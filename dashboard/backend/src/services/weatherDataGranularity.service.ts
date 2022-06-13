import { Injectable } from '@nestjs/common';
import { WeatherDataDto } from 'shared/dist/dto';
import { WeatherDataIndexer } from './weatherDataIndexer.service';
import { WeatherDataIterator } from './weatherDataIterator.service';

@Injectable()
export class WeatherDataGranularityService {
    public static DefaultCount = 150;

    calculateGranularity(dateFrom: Date, dateTo: Date): number {
        const dateFromMillis = dateFrom.getTime();
        const dateToMillis = dateTo.getTime();

        return Math.ceil((dateToMillis - dateFromMillis) / 1000 / WeatherDataGranularityService.DefaultCount);
    }

    transformByGranularity(
        data: WeatherDataDto[],
        dateFrom: Date,
        dateTo: Date,
        granularitySeconds: number
    ): WeatherDataDto[] {
        // Expect sorted data by timestamp
        const dateFromMillis = dateFrom.getTime();
        const dateToMillis = dateTo.getTime();

        const itemCount = this.#calculateItemCount(dateFromMillis, dateToMillis, granularitySeconds * 1000);
        const ratio = Math.floor(data.length / itemCount);

        const timestamps = this.#generateTimestamps(itemCount, dateFromMillis, granularitySeconds * 1000);
        const result: WeatherDataDto[] = [];
        for (let i = 0; i < itemCount; i++) {
            const timestamp = timestamps[i];
            result.push(this.#calculateGranularityBetween(timestamp, this.#getRelatedData(timestamp, data, ratio)));
        }

        return result;
    }

    #getRelatedData(timestamp: Date, data: WeatherDataDto[], ratio: number): WeatherDataDto[] {
        const indexer = new WeatherDataIndexer();
        const [lowerIndex, upperIndex] = indexer.findIndex(timestamp, data, 0, data.length);

        const iterator = new WeatherDataIterator(data, lowerIndex, upperIndex, ratio);
        return [...iterator.takePreviousFor(timestamp), ...iterator.takeNextFor(timestamp)];
    }

    #generateTimestamps(length: number, dateFromMillis: number, granularityMillis: number): Date[] {
        const calculateTimestamp = (itemNumber) => new Date(dateFromMillis + itemNumber * granularityMillis);

        return Array.from({ length }, (_, i) => calculateTimestamp(i));
    }

    #calculateItemCount(millisFrom: number, millisTo: number, granularityMillis) {
        if (millisFrom > millisTo) {
            throw new Error(`Invalid values - from: ${millisFrom}, to: ${millisTo}`);
        }

        return Math.ceil((millisTo - millisFrom) / granularityMillis) + 1;
    }

    #calculateGranularityBetween(timestamp: Date, data: WeatherDataDto[]): WeatherDataDto {
        return {
            temperature: this.#granularityFunction(data.map((x) => x.temperature)),
            humidity: this.#granularityFunction(data.map((x) => x.humidity)),
            timestamp,
        };
    }

    #granularityFunction(numbers: number[]) {
        if (numbers.length === 0) {
            return 0;
        }

        const avg = numbers.reduce((a, b) => a + b) / numbers.length;
        return Math.round(avg * 10) / 10;
    }
}
