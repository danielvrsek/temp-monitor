import { Workspace } from 'dataLayer/entities/workspace.entity';
import { WorkspaceViewModel } from 'shared/dto';

export const WorkspaceMapper = {
    mapToViewModel: (workspace: Workspace): WorkspaceViewModel => {
        return {
            id: workspace._id.toString(),
            name: workspace.name,
            createdAt: workspace.createdAt,
        };
    },
};
