import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class AssetService {
    async saveProfilePhotoAsync(filename: string, blob: Blob) {
        const folder = 'profile-photos/';
        const path = 'public/' + folder + filename;

        await fs.writeFile(path, await blob.stream());
        return filename;
    }
}
