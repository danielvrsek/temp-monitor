import { GatewayInfo, UserInfo } from 'shared/dto';
import { Socket } from 'socket.io';

class ClientSocket<TInfo> extends Socket {
    user: TInfo;
}

export class UserSocket extends ClientSocket<UserInfo> {}
export class GatewaySocket extends ClientSocket<GatewayInfo> {}
