import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'drivers-monitor', en);
i18next.addResourceBundle('es', 'drivers-monitor', es);

const DriversMonitorPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/drivers_monitor',
            component: React.lazy(() => import('./DriversMonitor/DriversMonitor')),
        },
    ],
};

export default DriversMonitorPageConfig;
