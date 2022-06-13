import { User } from 'dataLayer/entities/user.entity';
import { UserViewModel } from 'shared/dto';

export const UserMapper = {
    mapToViewModel: (user: User): UserViewModel => {
        return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastname: user.lastname,
            email: user.email,
            profilePhotoUrl: user.profilePhotoUrl,
        };
    },
};
