import { BadRequestException, Injectable } from '@nestjs/common';
import { Entities } from 'dataLayer/common/entities';
import { UserDevice } from 'dataLayer/entities/userDevice.entity';
import { UserDeviceRepository } from 'dataLayer/repositories/userDevice.repository';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { CreateUserDeviceDto } from 'shared/dto';
import { objectId } from 'utils/schemaHelper';

@Injectable()
export class UserDeviceService {
    private unitOfWork: UnitOfWork<UserDevice>;

    constructor(private readonly userDeviceRepository: UserDeviceRepository, unitOfWorkFactory: UnitOfWorkFactory) {
        this.unitOfWork = unitOfWorkFactory.create<UserDevice>(Entities.UserDevice);
    }

    createAsync(dto: CreateUserDeviceDto): Promise<UserDevice> {
        return this.unitOfWork.insertAsync({
            gatewayId: objectId(dto.gatewayId),
            name: dto.name,
            externalId: dto.externalId,
        });
    }

    async deleteAsync(userDeviceId: string): Promise<UserDevice> {
        const device = await this.userDeviceRepository.findByIdAsync(objectId(userDeviceId));
        if (!device) {
            throw new BadRequestException('Device does not exist');
        }

        return await this.unitOfWork.deleteAsync(device);
    }
}
