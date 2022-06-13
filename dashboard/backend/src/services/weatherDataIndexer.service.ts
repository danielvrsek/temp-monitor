import { WeatherDataDto } from 'shared/src/dto';

export class WeatherDataIndexer {
    findIndex(
        timestamp: Date,
        data: WeatherDataDto[],
        startIndex: number,
        length: number
    ): [lowerIndex: number, upperIndex: number] {
        if (timestamp <= data[startIndex].timestamp) {
            return [startIndex, startIndex];
        }
        const [middleIndex, remainder] = this.#getMiddleIndex(length);
        if (middleIndex == -1) {
            return [startIndex, startIndex + 1];
        }
        const lastIndex = startIndex + length - 1;
        if (timestamp >= data[lastIndex].timestamp) {
            return [lastIndex, lastIndex];
        }

        const index = startIndex + middleIndex;
        if (timestamp > data[index].timestamp) {
            return this.findIndex(timestamp, data, index, length - middleIndex - remainder);
        }

        if (timestamp < data[index].timestamp) {
            return this.findIndex(timestamp, data, startIndex, length - middleIndex - remainder);
        }

        // data[index].timestamp.getTime() === timestamp.getTime()
        return [index, index];
    }

    #getMiddleIndex(length): [quotient: number, remainder: number] {
        if (length < 2) {
            return [-1, -1];
        }

        return [Math.floor(length / 2), length % 2];
    }
}
