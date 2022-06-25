import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserData } from 'dataLayer/entities/userData.entity';
import { Entities } from 'dataLayer/common/schemaConstants';
import { objectId } from 'utils/schemaHelper';
import { InsertUserDataDto } from 'shared/dto';
import { UnitOfWork, UnitOfWorkFactory } from 'dataLayer/unitOfWork';

@Injectable()
export class UserDataService {
    private unitOfWork: UnitOfWork<UserData>;

    constructor(unitOfWorkFactory: UnitOfWorkFactory) {
        this.unitOfWork = unitOfWorkFactory.create<UserData>(Entities.UserData);
    }
    async insertAsync(userDataGroupId: Types.ObjectId, dto: InsertUserDataDto): Promise<number> {
        const length = dto.data.length;
        await this.unitOfWork.insertManyAsync(
            dto.data.map((data) => ({ userDataGroupId: objectId(userDataGroupId), ...data }))
        );

        return length;
    }

    sort(data: UserData[]): UserData[] {
        return data.sort((a, b) => a.timestamp - b.timestamp);
    }
}
