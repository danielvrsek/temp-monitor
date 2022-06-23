/* eslint-disable no-console */
import { Command, Option, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserDataService } from 'services/userData.service';
import * as fs from 'fs/promises';
import { objectId } from 'utils/schemaHelper';

@Injectable()
export class ImportDataCommand {
    constructor(private readonly userDataService: UserDataService) {}

    @Command({ command: 'importData <userGroupDataId> <filepath>', describe: 'Import data' })
    async importDataAsync(
        @Positional({
            name: 'userGroupDataId',
            describe: 'userGroupDataId to attach data to',
            type: 'string',
        })
        userGroupDataId: string,
        @Positional({
            name: 'filepath',
            describe: 'filepath of the json file containing data',
            type: 'string',
        })
        filepath: string
    ) {
        const dataRaw = await fs.readFile(filepath, { encoding: 'utf-8' });
        const data: Date[] = JSON.parse(dataRaw);

        const count = await this.userDataService.insertAsync(objectId(userGroupDataId), {
            data: data.map((x) => ({ value: 20, timestamp: x })),
        });

        console.log(`Imported ${count} items`);
    }
}
