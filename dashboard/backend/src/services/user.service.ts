import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { encodePassword } from 'utils/bcrypt';
import { User } from 'dataLayer/entities/user.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { CreateUserDto, UpdateUserDto, UserViewModel } from 'shared/dist/dto';
import { UserMapper } from 'mappers/user.mapper';

@Injectable()
export class UserService {
    constructor(@InjectModel(SchemaConstants.User) private readonly model: Model<User>) {}

    async createAsync(user: CreateUserDto): Promise<User> {
        const passwordHash = !user.isExternal ? encodePassword(user.passwordRaw) : null;
        const newUser = new this.model({
            firstName: user.firstName,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            isExternal: user.isExternal,
            profilePhotoUrl: user.profilePhotoUrl,
            passwordHash,
        });
        return await newUser.save();
    }

    async deleteAsync(id: string): Promise<UserViewModel> {
        return await this.model.findByIdAndRemove(id);
    }

    async updateAsync(id: string, userDto: UpdateUserDto): Promise<UserViewModel> {
        const user = await this.model.findByIdAndUpdate(id, userDto, { new: true });
        return UserMapper.mapToViewModel(user);
    }
}
