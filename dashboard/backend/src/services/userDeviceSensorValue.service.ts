import { Injectable } from '@nestjs/common';
import { Entities } from 'dataLayer/common/entities';
import { objectId } from 'utils/schemaHelper';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { UserDeviceSensorValue } from 'dataLayer/entities/userDeviceSensorValue.entity';
import { InsertUserDeviceSensorDataDto } from 'shared/dto';
import { UserDeviceSensorRepository } from 'dataLayer/repositories/userDeviceSensor.repository';

@Injectable()
export class UserDeviceSensorValueService {
    private unitOfWork: UnitOfWork<UserDeviceSensorValue>;

    constructor(
        private readonly userDeviceSensorRepository: UserDeviceSensorRepository,
        unitOfWorkFactory: UnitOfWorkFactory
    ) {
        this.unitOfWork = unitOfWorkFactory.create<UserDeviceSensorValue>(Entities.UserDeviceSensorValue);
    }
    async insertAsync(dto: InsertUserDeviceSensorDataDto): Promise<number> {
        const { userDeviceSensorId, data } = dto;
        if (!(await this.userDeviceSensorRepository.findByIdAsync(objectId(userDeviceSensorId)))) {
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
