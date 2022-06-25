import { UserDevice } from 'dataLayer/entities/userDevice.entity';
import { UserDeviceViewModel } from 'shared/dto';

export const UserDeviceMapper = {
    mapToViewModel(userDevice: UserDevice): UserDeviceViewModel {
        return {
            id: userDevice._id.toString(),
            name: userDevice.name,
            createdAt: userDevice.createdAt,
        };
    },
};
