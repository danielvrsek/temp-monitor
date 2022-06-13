import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { GatewayAuthorizationType } from './enums/gatewayAuthorizationType';
import { Entity } from './entity';

@Schema({ timestamps: true })
export class GatewayAuthorization extends Entity {
    @Prop() secret: string;

    @Prop() authorizationType: GatewayAuthorizationType;

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.Gateway })
    gatewayId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: SchemaConstants.Workspace })
    workspaceId: Types.ObjectId;
}

export const GatewayAuthorizationSchema = SchemaFactory.createForClass(GatewayAuthorization);
