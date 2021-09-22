import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const SchedulesPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/schedules',
            component: React.lazy(() => import('./SchedulesPage')),
        },
    ],
};

export default SchedulesPageConfig;
