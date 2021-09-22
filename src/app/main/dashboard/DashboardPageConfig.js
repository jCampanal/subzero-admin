import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const DashboardPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/dashboard',
            component: React.lazy(() => import('./DashboardPage')),
        },
    ],
};

export default DashboardPageConfig;
