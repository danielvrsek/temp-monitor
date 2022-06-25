import { Injectable } from '@nestjs/common';
import { UserDataDto } from 'shared/dto';
import { UserDataIndexer } from './userDataIndexer.service';
import { UserDataIterator } from './userDataIterator.service';

@Injectable()
export class UserDataGranularityService {
    public static DefaultCount = 150;

    calculateGranularity(dateFrom: Date, dateTo: Date): number {
        const dateFromMillis = dateFrom.getTime();
        const dateToMillis = dateTo.getTime();

        return Math.ceil((dateToMillis - dateFromMillis) / 1000 / UserDataGranularityService.DefaultCount);
    }

    transformByGranularity(
        data: UserDataDto[],
        dateFrom: Date,
        dateTo: Date,
        granularitySeconds: number
    ): UserDataDto[] {
        // Expect sorted data by timestamp
        const dateFromMillis = dateFrom.getTime();
        const dateToMillis = dateTo.getTime();

        const itemCount = this.#calculateItemCount(dateFromMillis, dateToMillis, granularitySeconds * 1000);
        const ratio = Math.floor(data.length / itemCount);

        const timestamps = this.#generateTimestamps(itemCount, dateFromMillis, granularitySeconds * 1000);
        const result: UserDataDto[] = [];
        for (let i = 0; i < itemCount; i++) {
            const timestamp = timestamps[i];
            result.push(this.#calculateGranularityBetween(timestamp, this.#getRelatedData(timestamp, data, ratio)));
        }

        return result;
    }

    #getRelatedData(timestamp: number, data: UserDataDto[], ratio: number): UserDataDto[] {
        const indexer = new UserDataIndexer();
        const [lowerIndex, upperIndex] = indexer.findIndex(timestamp, data, 0, data.length);

        const iterator = new UserDataIterator(data, lowerIndex, upperIndex, ratio);
        return [...iterator.takePreviousFor(timestamp), ...iterator.takeNextFor(timestamp)];
    }

    #generateTimestamps(length: number, dateFromMillis: number, granularityMillis: number): number[] {
        const calculateTimestamp = (itemNumber) => dateFromMillis + itemNumber * granularityMillis;

        return Array.from({ length }, (_, i) => calculateTimestamp(i));
    }

    #calculateItemCount(millisFrom: number, millisTo: number, granularityMillis) {
        if (millisFrom > millisTo) {
            throw new Error(`Invalid values - from: ${millisFrom}, to: ${millisTo}`);
        }

        return Math.ceil((millisTo - millisFrom) / granularityMillis) + 1;
    }

    #calculateGranularityBetween(timestamp: number, data: UserDataDto[]): UserDataDto {
        return {
            value: this.#granularityFunction(data.map((x) => x.value)),
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
