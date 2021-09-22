import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const DriversMonitorPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/drivers_monitor',
            component: React.lazy(() => import('./DriversMonitorPage')),
        },
    ],
};

export default DriversMonitorPageConfig;
