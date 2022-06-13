import { WeatherDataDto } from 'shared/dto';

export class WeatherDataIterator {
    private lowerIndex: number;
    private upperIndex: number;

    constructor(
        private readonly data: WeatherDataDto[],
        private readonly lowerIndexInit: number,
        private readonly upperIndexInit: number,
        private readonly ratio: number
    ) {
        this.lowerIndex = lowerIndexInit;
        this.upperIndex = upperIndexInit;
    }

    hasPrevious() {
        return this.lowerIndex >= 0 && this.lowerIndex >= this.lowerIndexInit - this.ratio;
    }

    hasNext() {
        return this.upperIndex < this.data.length && this.upperIndex <= this.upperIndexInit + this.ratio;
    }

    getPrevious() {
        return this.data[this.lowerIndex--];
    }

    getNext() {
        return this.data[this.upperIndex++];
    }

    takePreviousFor(timestamp: Date) {
        const result: WeatherDataDto[] = [];

        while (this.hasPrevious()) {
            const previous = this.getPrevious();
            if (timestamp < previous.timestamp) {
                break;
            }
            result.push(previous);
        }

        return result;
    }

    takeNextFor(timestamp: Date): WeatherDataDto[] {
        const result: WeatherDataDto[] = [];

        while (this.hasNext()) {
            const next = this.getNext();
            if (timestamp > next.timestamp) {
                break;
            }
            result.push(next);
        }

        return result;
    }
}
