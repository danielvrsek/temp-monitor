import { Gateway } from 'dataLayer/entities/gateway.entity';
import { GatewayViewModel } from 'shared/dto';

export const GatewayMapper = {
    mapToViewModel: (gateway: Gateway): GatewayViewModel => {
        return { id: gateway._id.toString(), name: gateway.name, state: gateway.state };
    },
};
