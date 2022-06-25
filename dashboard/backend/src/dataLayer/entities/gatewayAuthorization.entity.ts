import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entities } from 'dataLayer/common/entities';
import { GatewayAuthorizationType } from './enums/gatewayAuthorizationType';
import { Entity } from './entity';

@Schema({ timestamps: true })
export class GatewayAuthorization extends Entity {
    @Prop() secret: string;

    @Prop() authorizationType: GatewayAuthorizationType;

    @Prop({ type: Types.ObjectId, ref: Entities.Gateway })
    gatewayId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Entities.Workspace })
    workspaceId: Types.ObjectId;
}

export const GatewayAuthorizationSchema = SchemaFactory.createForClass(GatewayAuthorization);
