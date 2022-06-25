/* eslint-disable no-console */
import { Command, Option, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { UserDeviceSensorValueService } from 'services/userDeviceSensorValue.service';

@Injectable()
export class ImportDataCommand {
    constructor(private readonly userDeviceSensorValueService: UserDeviceSensorValueService) {}

    @Command({ command: 'importData <userDeviceSensorId> <filepath>', describe: 'Import data' })
    async importDataAsync(
        @Positional({
            name: 'userDeviceSensorId',
            describe: 'userDeviceSensorId to attach data to',
            type: 'string',
        })
        userDeviceSensorId: string,
        @Positional({
            name: 'filepath',
            describe: 'filepath of the json file containing data',
            type: 'string',
        })
        filepath: string
    ) {
        const dataRaw = await fs.readFile(filepath, { encoding: 'utf-8' });
        const data: Date[] = JSON.parse(dataRaw);

        const count = await this.userDeviceSensorValueService.insertAsync({
            userDeviceSensorId,
            data: data.map((x) => ({ value: 20, timestamp: x.getTime() })),
        });

        console.log(`Imported ${count} items`);
    }
}
