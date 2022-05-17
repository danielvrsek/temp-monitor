import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'dataLayer/entities/user.entity';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(SchemaConstants.User) private readonly model: Model<User>) {}

    async findAllAsync(): Promise<User[]> {
        return await this.model.find();
    }

    async findByIdAsync(id: string): Promise<User> {
        const user = await this.model.findById(id);
        if (!user) {
            throw new HttpException('User with this ID does not exist', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async findByUsernameAsync(username: string): Promise<User> {
        const user = await this.model.findOne({ username });
        if (!user) {
            return null;
        }

        return user;
    }
}
