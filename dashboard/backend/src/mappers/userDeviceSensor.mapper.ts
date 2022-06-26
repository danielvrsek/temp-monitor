import { UserDeviceSensor } from 'dataLayer/entities/userDeviceSensor.entity';
import { UserDeviceSensorViewModel } from 'shared/dto';

export const UserDeviceSensorMapper = {
    mapToViewModel(userDeviceSensor: UserDeviceSensor): UserDeviceSensorViewModel {
        return {
            id: userDeviceSensor._id.toString(),
            name: userDeviceSensor.name,
            valueUnit: userDeviceSensor.valueUnit,
            externalId: userDeviceSensor.externalId,
            createdAt: userDeviceSensor.createdAt,
        };
    },
};
