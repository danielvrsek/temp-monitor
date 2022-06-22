import { UserData } from 'dataLayer/entities/userData.entity';
import { UserDataViewModel } from 'shared/dto';

export const UserDataMapper = {
    mapToViewModel(userData: UserData): UserDataViewModel {
        return {
            value: userData.value,
            timestamp: userData.timestamp,
        };
    },
};
