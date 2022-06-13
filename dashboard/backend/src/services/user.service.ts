import { Injectable } from '@nestjs/common';
import { encodePassword } from 'utils/bcrypt';
import { User } from 'dataLayer/entities/user.entity';
import { CreateUserDto, UpdateUserDto, UserViewModel } from 'shared/dto';
import { UserMapper } from 'mappers/user.mapper';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { objectId } from 'utils/schemaHelper';

@Injectable()
export class UserService {
    private unitOfWork: UnitOfWork<User>;

    constructor(unitOfWorkFactory: UnitOfWorkFactory) {
        this.unitOfWork = unitOfWorkFactory.create<User>(SchemaConstants.User);
    }

    async createAsync(user: CreateUserDto): Promise<User> {
        const passwordHash = !user.isExternal ? encodePassword(user.passwordRaw) : null;
        return await this.unitOfWork.insertAsync({
            firstName: user.firstName,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            isExternal: user.isExternal,
            profilePhotoUrl: user.profilePhotoUrl,
            passwordHash,
        });
    }

    async deleteAsync(id: string): Promise<UserViewModel> {
        return UserMapper.mapToViewModel(await this.unitOfWork.deleteByIdAsync(objectId(id)));
    }

    async updateAsync(id: string, userDto: UpdateUserDto): Promise<UserViewModel> {
        const user = await this.unitOfWork.updateWithCallbackAsync(objectId(id), (user) => {
            user.firstName = userDto.firstName;
            user.lastname = userDto.lastname;
        });
        return UserMapper.mapToViewModel(user);
    }
}
