import { UserDeviceSensorValue } from 'dataLayer/entities/userDeviceSensorValue.entity';
import { UserDeviceSensorValueViewModel } from 'shared/dto';

export const UserDeviceSensorValueMapper = {
    mapToViewModel(sensorValue: UserDeviceSensorValue): UserDeviceSensorValueViewModel {
        return {
            value: sensorValue.value,
            timestamp: sensorValue.timestamp,
        };
    },
};
