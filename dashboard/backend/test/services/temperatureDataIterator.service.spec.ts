import { UserDataIterator } from '../../src/services/userDataIterator.service';

describe('UserDataIterator', () => {
    describe('takePreviousFor', () => {
        it('should return one when first item equals', async () => {
            const data = [
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            const service = new UserDataIterator(data, 0, 0, 1);

            const result = [
                {
                    temperature: 20,
                    humidity: 50,
                    timestamp: new Date('2022-06-09T16:40:08.107Z'),
                },
            ];

            expect(service.takePreviousFor(new Date('2022-06-09T16:40:08.107Z'))).toEqual(result);
        });

        it('should return none when first item is higher', async () => {
            const data = [
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            const service = new UserDataIterator(data, 0, 0, 1);

            const result = [];

            expect(service.takePreviousFor(new Date('2022-06-09T16:39:08.107Z'))).toEqual(result);
        });
    });

    describe('takeNextFor', () => {
        it('should return one when last item equals', async () => {
            const data = [
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            const service = new UserDataIterator(data, 2, 2, 1);

            const result = [
                {
                    temperature: 20,
                    humidity: 50,
                    timestamp: new Date('2022-06-09T16:50:08.107Z'),
                },
            ];

            expect(service.takeNextFor(new Date('2022-06-09T16:50:08.107Z'))).toEqual(result);
        });

        it('should return none when last item is lower', async () => {
            const data = [
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { temperature: 20, humidity: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            const service = new UserDataIterator(data, 2, 2, 1);

            const result = [];

            expect(service.takeNextFor(new Date('2022-06-09T16:51:08.107Z'))).toEqual(result);
        });
    });
});
