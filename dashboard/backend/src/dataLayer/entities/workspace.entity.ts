import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entity } from './entity';
import { WorkspaceType } from './enums/workspaceType.enum';

@Schema({ timestamps: true })
export class Workspace extends Entity {
    @Prop() name: string;
    @Prop() type: WorkspaceType;
    @Prop() createdAt?: Date;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
