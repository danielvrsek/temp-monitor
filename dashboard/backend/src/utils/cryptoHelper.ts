import { randomBytes } from 'crypto';

export class CryptoHelper {
    generatePassword(length: number): string {
        if (length % 2 !== 0) {
            throw new Error('Length must be divisible by 2.');
        }

        return randomBytes(length / 2).toString('hex');
    }
}
