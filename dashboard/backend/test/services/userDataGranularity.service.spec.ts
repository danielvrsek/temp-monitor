import { UserDeviceSensorValueGranularityService } from '../../src/services/userDeviceSensorValueGranularity.service';

describe('UserDeviceSensorValueGranularityService', () => {
    let service: UserDeviceSensorValueGranularityService;

    beforeEach(() => {
        service = new UserDeviceSensorValueGranularityService();
    });

    describe('calculateGranularity', () => {
        it('should calculate granularity', async () => {
            const dateFrom = new Date('2022-06-09T16:40:08.107Z');
            const dateTo = new Date(dateFrom);
            dateTo.setHours(dateFrom.getHours() + UserDeviceSensorValueGranularityService.DefaultCount);

            const result = 3600; // hour
            expect(service.calculateGranularity(dateFrom, dateTo)).toEqual(result);
        });

        it('should calculate granularity for a day', async () => {
            const dateFrom = new Date('2022-06-09T16:40:08.107Z');
            const dateTo = new Date('2022-06-10T16:40:08.107Z');

            const result = 576;
            expect(service.calculateGranularity(dateFrom, dateTo)).toEqual(result);
        });
    });
    describe('transformByGranularity', () => {
        it('should upscale the data', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:50:08.107Z').getTime() },
            ];

            const result = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:41:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:42:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:43:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:44:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:46:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:47:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:48:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:49:08.107Z').getTime() },
                { value: 50, timestamp: new Date('2022-06-09T16:50:08.107Z').getTime() },
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
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z').getTime() },
                { value: 60, timestamp: new Date('2022-06-09T16:41:08.107Z').getTime() },
                { value: 70, timestamp: new Date('2022-06-09T16:42:08.107Z').getTime() },
                { value: 80, timestamp: new Date('2022-06-09T16:43:08.107Z').getTime() },
                { value: 90, timestamp: new Date('2022-06-09T16:44:08.107Z').getTime() },
                { value: 100, timestamp: new Date('2022-06-09T16:45:08.107Z').getTime() },
                { value: 110, timestamp: new Date('2022-06-09T16:46:08.107Z').getTime() },
                { value: 120, timestamp: new Date('2022-06-09T16:47:08.107Z').getTime() },
                { value: 130, timestamp: new Date('2022-06-09T16:48:08.107Z').getTime() },
                { value: 140, timestamp: new Date('2022-06-09T16:49:08.107Z').getTime() },
                { value: 150, timestamp: new Date('2022-06-09T16:50:08.107Z').getTime() },
            ];

            const result = [
                { value: 62, timestamp: new Date('2022-06-09T16:40:08.107Z').getTime() },
                { value: 100, timestamp: new Date('2022-06-09T16:45:08.107Z').getTime() },
                { value: 138, timestamp: new Date('2022-06-09T16:50:08.107Z').getTime() },
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
