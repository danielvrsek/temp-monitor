import { UserDataIndexer } from '../../src/services/userDataIndexer.service';

describe('UserDataIndexer', () => {
    let service: UserDataIndexer;

    beforeEach(() => {
        service = new UserDataIndexer();
    });

    describe('findIndex', () => {
        it('should calculate first index for first value', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            expect(service.findIndex(new Date('2022-06-09T16:40:08.107Z'), data, 0, data.length)).toEqual([0, 0]);
        });

        it('should calculate last index for last value', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            expect(service.findIndex(new Date('2022-06-09T16:50:08.107Z'), data, 0, data.length)).toEqual([2, 2]);
        });

        it('should calculate middle index for odd when middle value equals', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            expect(service.findIndex(new Date('2022-06-09T16:45:08.107Z'), data, 0, data.length)).toEqual([1, 1]);
        });

        it('should calculate middle index for odd when value equals', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:41:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:42:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:43:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:44:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:46:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:47:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:49:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            expect(service.findIndex(new Date('2022-06-09T16:43:08.107Z'), data, 0, data.length)).toEqual([3, 3]);
        });

        it('should calculate middle index for odd when value between', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:41:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:42:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:43:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:44:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:46:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:47:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:49:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:50:08.107Z') },
            ];

            expect(service.findIndex(new Date('2022-06-09T16:46:38.107Z'), data, 0, data.length)).toEqual([7, 8]);
        });

        it('should calculate middle index for even when value equals', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:41:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:42:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:43:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:44:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:46:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:47:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:49:08.107Z') },
            ];

            expect(service.findIndex(new Date('2022-06-09T16:45:08.107Z'), data, 0, data.length)).toEqual([5, 5]);
        });

        it('should calculate middle index for even when value between', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:41:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:42:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:43:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:44:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:46:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:47:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:49:08.107Z') },
            ];

            expect(service.findIndex(new Date('2022-06-09T16:46:38.107Z'), data, 0, data.length)).toEqual([7, 8]);
        });

        it('should calculate first index', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:41:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:42:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:43:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:44:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:46:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:47:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:49:08.107Z') },
            ];

            expect(service.findIndex(new Date('2022-06-09T16:39:38.107Z'), data, 0, data.length)).toEqual([0, 0]);
        });

        it('should calculate last index', async () => {
            const data = [
                { value: 50, timestamp: new Date('2022-06-09T16:40:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:41:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:42:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:43:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:44:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:45:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:46:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:47:08.107Z') },
                { value: 50, timestamp: new Date('2022-06-09T16:49:08.107Z') },
            ];

            expect(service.findIndex(new Date('2022-06-09T16:50:38.107Z'), data, 0, data.length)).toEqual([9, 9]);
        });
    });
});
