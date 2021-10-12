import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'dashboard', en);
i18next.addResourceBundle('es', 'dashboard', es);

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
