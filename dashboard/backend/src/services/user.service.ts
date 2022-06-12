import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { encodePassword } from 'utils/bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from 'dataLayer/entities/user.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { WorkspaceMembership } from 'dataLayer/entities/workspaceMembership.entity';

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

    async deleteAsync(id: string): Promise<User> {
        return await this.model.findByIdAndRemove(id);
    }

    async updateAsync(id: string, user: UpdateUserDto): Promise<User> {
        return await this.model.findByIdAndUpdate(id, user, { new: true });
    }
}
