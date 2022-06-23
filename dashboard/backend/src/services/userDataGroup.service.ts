import { Injectable } from '@nestjs/common';
import { Entities } from 'dataLayer/common/schemaConstants';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { CreateUserDataGroupDto } from 'shared/dto';
import { UserDataGroup } from 'dataLayer/entities/userDataGroup.entity';
import { objectId } from 'utils/schemaHelper';

@Injectable()
export class UserDataGroupService {
    private unitOfWork: UnitOfWork<UserDataGroup>;

    constructor(unitOfWorkFactory: UnitOfWorkFactory) {
        this.unitOfWork = unitOfWorkFactory.create<UserDataGroup>(Entities.UserDataGroup);
    }

    createAsync(dto: CreateUserDataGroupDto): Promise<UserDataGroup> {
        return this.unitOfWork.insertAsync({
            gatewayId: objectId(dto.gatewayId),
            name: dto.name,
        });
    }
}
