import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Gateway } from 'dataLayer/entities/gateway.entity';

@Injectable()
export class GatewayRepository {
    constructor(@InjectModel(SchemaConstants.Gateway) private readonly model: Model<Gateway>) {}

    async findAllByIdAsync(ids: Types.ObjectId[]) {
        return await this.model.find({
            _id: { $in: ids },
        });
    }

    async findByIdAsync(id: Types.ObjectId): Promise<Gateway> {
        return await this.model.findOne({ _id: id });
    }
}
