import Home from '../../pages/Home';

import Login from '../../pages/Login';
import CustomerInfo from '../../pages/CustomerInfo';
import InDevelopment from '../inDevelopment/InDevelopment';
import EditUser from '../user/EditUser';
import DeleteUser from '../user/DeleteUser';

import WorkspaceListPage from '../../admin_console/pages/workspaceListPage';
import WorkspaceDetailPage from '../../admin_console/pages/workspaceDetailPage';
import WeatherstationDetailPage from '../../admin_console/pages/weatherstationDetailPage';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home Page',
        protected: false,
    },

    {
        path: '/login',
        exact: true,
        component: Login,
        name: 'Login',
        protected: false,
    },
    {
        path: '/customer-info',
        exact: true,
        component: CustomerInfo,
        name: 'Customer Information page',
        protected: false,
    },
    {
        path: '/in-development',
        exact: true,
        component: InDevelopment,
        name: 'Page is in development mode',
        protected: false,
    },
    {
        path: '/edit/:id',
        exact: true,
        component: EditUser,
        name: 'Edit user',
        protected: true,
    },
    {
        path: '/delete/:id',
        exact: true,
        component: DeleteUser,
        name: 'Delete user',
        protected: true,
    },
    {
        path: '/workspaces',
        exact: true,
        component: WorkspaceListPage,
        name: 'Workspaces',
        protected: true,
    },
    {
        path: '/workspace',
        exact: true,
        component: WorkspaceDetailPage,
        name: 'Workspace detail',
        protected: true,
    },
    {
        path: '/weatherstations/:id',
        exact: true,
        component: WeatherstationDetailPage,
        name: 'Weatherstation detail',
        protected: true,
    },
];

export default routes;
