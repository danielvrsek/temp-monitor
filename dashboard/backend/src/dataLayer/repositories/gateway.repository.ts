import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { Repository } from './respository';

@Injectable()
export class GatewayRepository extends Repository<Gateway> {
    constructor(@InjectModel(SchemaConstants.Gateway) model: Model<Gateway>) {
        super(model);
    }

    findAllByIdAsync(ids: Types.ObjectId[]) {
        return super.findAllByIdAsync(ids);
    }

    findByIdAsync(id: Types.ObjectId): Promise<Gateway> {
        return super.findByIdAsync(id);
    }
}
