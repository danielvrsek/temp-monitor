import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { WorkspaceType } from './enums/workspaceType.enum';

@Schema({ timestamps: true })
export class Workspace {
    _id: Types.ObjectId;

    @Prop() name: string;
    @Prop() type: WorkspaceType;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
