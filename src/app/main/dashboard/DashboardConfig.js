import {lazy} from 'react';

const DashboardConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/dashboard',
            component: lazy(() => import('./Dashboard')),
        },
    ],
};

export default DashboardConfig;
