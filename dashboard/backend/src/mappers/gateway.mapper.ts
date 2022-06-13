import { GatewayState } from 'dataLayer/entities/enums/gatewayState.enum';
import { Gateway } from 'dataLayer/entities/gateway.entity';
import { GatewayStateDto, GatewayViewModel } from 'shared/dto';

export const GatewayMapper = {
    mapToViewModel: (gateway: Gateway): GatewayViewModel => {
        return {
            id: gateway._id.toString(),
            name: gateway.name,
            state: GatewayMapper.mapGatewayStateToDto(gateway.state),
            createdAt: gateway.createdAt,
        };
    },

    mapGatewayStateFromDto: (stateDto: GatewayStateDto) => {
        switch (stateDto) {
            case GatewayStateDto.Created:
                return GatewayState.Created;
            case GatewayStateDto.Registered:
                return GatewayState.Registered;
            default:
                throw new Error(stateDto);
        }
    },

    mapGatewayStateToDto: (stateDto: GatewayState) => {
        switch (stateDto) {
            case GatewayState.Created:
                return GatewayStateDto.Created;
            case GatewayState.Registered:
                return GatewayStateDto.Registered;
            default:
                throw new Error(stateDto);
        }
    },
};
