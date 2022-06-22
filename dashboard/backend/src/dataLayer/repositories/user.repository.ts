import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { User } from 'dataLayer/entities/user.entity';
import { Entities } from 'dataLayer/common/schemaConstants';
import { Repository } from './respository';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(@InjectModel(Entities.User) model: Model<User>) {
        super(model);
    }

    findAllAsync(): Promise<User[]> {
        return super.findAllAsync();
    }

    async findByIdAsync(id: Types.ObjectId): Promise<User> {
        const user = await super.findByIdAsync(id);
        if (!user) {
            throw new HttpException('User with this ID does not exist', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    findAllByIdsAsync(userIds: Types.ObjectId[]): Promise<User[]> {
        return super.findAllByIdAsync(userIds);
    }

    async findByUsernameAsync(username: string): Promise<User> {
        const user = await super.findOneAsync({ username });
        if (!user) {
            return null;
        }

        return user;
    }
}
