import { WeatherDataGranularityService } from '../../src/services/weatherDataGranularity.service';

describe('WeatherDataGranuralityService', () => {
    let service: WeatherDataGranularityService;

    beforeEach(() => {
        service = new WeatherDataGranularityService();
    });

    describe('transformByGranularity', () => {
        it('should upscale the data', async () => {
            const data = [
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            const result = [
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:41:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:42:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:43:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:44:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:46:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:47:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:48:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:49:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            expect(
                service.transformByGranularity(
                    data,
                    new Date('2022-06-09T16:40:08.107Z'),
                    new Date('2022-06-09T16:50:08.107Z'),
                    60
                )
            ).toEqual(result);
        });

        it('should downscale the data', async () => {
            const data = [
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { temperature: 20, humidity: 60, timestamp: new Date('2022-06-09T16:41:08.107Z') },
                { temperature: 20, humidity: 70, timestamp: new Date('2022-06-09T16:42:08.107Z') },
                { temperature: 20, humidity: 80, timestamp: new Date('2022-06-09T16:43:08.107Z') },
                { temperature: 20, humidity: 90, timestamp: new Date('2022-06-09T16:44:08.107Z') },
                { temperature: 20, humidity: 100, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { temperature: 20, humidity: 110, timestamp: new Date('2022-06-09T16:46:08.107Z') },
                { temperature: 20, humidity: 120, timestamp: new Date('2022-06-09T16:47:08.107Z') },
                { temperature: 20, humidity: 130, timestamp: new Date('2022-06-09T16:48:08.107Z') },
                { temperature: 20, humidity: 140, timestamp: new Date('2022-06-09T16:49:08.107Z') },
                { temperature: 20, humidity: 150, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            const result = [
                { temperature: 20, humidity: 62, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { temperature: 20, humidity: 100, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { temperature: 20, humidity: 138, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            expect(
                service.transformByGranularity(
                    data,
                    new Date('2022-06-09T16:40:08.107Z'),
                    new Date('2022-06-09T16:50:08.107Z'),
                    300
                )
            ).toEqual(result);
        });
    });
});
