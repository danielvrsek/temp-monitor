import { Injectable } from '@nestjs/common';
import { Entities } from 'dataLayer/common/entities';
import { objectId } from 'utils/schemaHelper';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { UserDeviceRepository } from 'dataLayer/repositories/userDevice.repository';
import { UserDeviceSensorValue } from 'dataLayer/entities/userDeviceSensorValue.entity';
import { InsertUserDeviceSensorDataDto } from 'shared/dto';

@Injectable()
export class UserDeviceSensorValueService {
    private unitOfWork: UnitOfWork<UserDeviceSensorValue>;

    constructor(private readonly userDeviceRepository: UserDeviceRepository, unitOfWorkFactory: UnitOfWorkFactory) {
        this.unitOfWork = unitOfWorkFactory.create<UserDeviceSensorValue>(Entities.UserDeviceSensorValue);
    }
    async insertAsync(dto: InsertUserDeviceSensorDataDto): Promise<number> {
        const { userDeviceSensorId, data } = dto;
        if (!(await this.userDeviceRepository.findByIdAsync(objectId(userDeviceSensorId)))) {
            throw new Error('Specified userDeviceSensor does not exist');
        }

        const length = data.length;
        await this.unitOfWork.insertManyAsync(
            data.map((data) => ({ userDeviceSensorId: objectId(userDeviceSensorId), ...data }))
        );

        return length;
    }

    sort(data: UserDeviceSensorValue[]): UserDeviceSensorValue[] {
        return data.sort((a, b) => a.timestamp - b.timestamp);
    }
}
