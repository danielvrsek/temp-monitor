import { Injectable } from '@nestjs/common';
import { Entities } from 'dataLayer/common/schemaConstants';
import { UserDevice } from 'dataLayer/entities/userDevice.entity';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { CreateDeviceDto } from 'shared/dto';
import { objectId } from 'utils/schemaHelper';

@Injectable()
export class UserDeviceService {
    private unitOfWork: UnitOfWork<UserDevice>;

    constructor(unitOfWorkFactory: UnitOfWorkFactory) {
        this.unitOfWork = unitOfWorkFactory.create<UserDevice>(Entities.UserDevice);
    }

    createAsync(dto: CreateDeviceDto): Promise<UserDevice> {
        return this.unitOfWork.insertAsync({
            gatewayId: objectId(dto.gatewayId),
            name: dto.name,
        });
    }
}
