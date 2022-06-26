import { Injectable } from '@nestjs/common';
import { Entities } from 'dataLayer/common/entities';
import { UserDeviceSensor } from 'dataLayer/entities/userDeviceSensor.entity';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { CreateUserDeviceSensorDto } from 'shared/dto';
import { objectId } from 'utils/schemaHelper';

@Injectable()
export class UserDeviceSensorService {
    private unitOfWork: UnitOfWork<UserDeviceSensor>;

    constructor(unitOfWorkFactory: UnitOfWorkFactory) {
        this.unitOfWork = unitOfWorkFactory.create<UserDeviceSensor>(Entities.UserDeviceSensor);
    }

    createAsync(dto: CreateUserDeviceSensorDto): Promise<UserDeviceSensor> {
        return this.unitOfWork.insertAsync({
            userDeviceId: objectId(dto.userDeviceId),
            name: dto.name,
            valueUnit: dto.valueUnit,
            externalId: dto.externalId,
        });
    }
}
