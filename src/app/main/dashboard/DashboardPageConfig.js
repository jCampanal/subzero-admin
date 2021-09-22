import i18next from 'i18next';
import DashboardPage from './DashboardPage';
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
            component: DashboardPage,
        },
    ],
};

export default DashboardPageConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/dashboard',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
