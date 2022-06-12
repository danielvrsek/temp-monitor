import { Types } from 'mongoose';

export const objectId = (prop) => new Types.ObjectId(prop);
