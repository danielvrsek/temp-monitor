import { UserRole } from 'dataLayer/entities/enums/userRole.enum';
import { User } from 'dataLayer/entities/user.entity';
import { UserRoleDto, UserViewModel } from 'shared/dto';

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

    mapUserRoleToDto: (userRole: UserRole): UserRoleDto => {
        switch (userRole) {
            case UserRole.Admin:
                return UserRoleDto.Admin;
            case UserRole.User:
                return UserRoleDto.User;
            case UserRole.Member:
                return UserRoleDto.Member;
            default:
                throw new Error(userRole);
        }
    },
};
