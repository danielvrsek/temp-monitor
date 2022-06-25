import { Injectable } from '@nestjs/common';
import { UserData } from 'dataLayer/entities/userData.entity';
import { Entities } from 'dataLayer/common/schemaConstants';
import { objectId } from 'utils/schemaHelper';
import { InsertUserDataDto } from 'shared/dto';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';
import { UserDataGroupRepository } from 'dataLayer/repositories/userDataGroup.repository';

@Injectable()
export class UserDataService {
    private unitOfWork: UnitOfWork<UserData>;

    constructor(
        private readonly userDataGroupRepository: UserDataGroupRepository,
        unitOfWorkFactory: UnitOfWorkFactory
    ) {
        this.unitOfWork = unitOfWorkFactory.create<UserData>(Entities.UserData);
    }
    async insertAsync(dto: InsertUserDataDto): Promise<number> {
        const { userDataGroupId, data } = dto;
        if (!(await this.userDataGroupRepository.findByIdAsync(objectId(userDataGroupId)))) {
            throw new Error('Specified userDataGroup does not exist');
        }

        const length = data.length;
        await this.unitOfWork.insertManyAsync(
            data.map((data) => ({ userDataGroupId: objectId(userDataGroupId), ...data }))
        );

        return length;
    }

    sort(data: UserData[]): UserData[] {
        return data.sort((a, b) => a.timestamp - b.timestamp);
    }
}
