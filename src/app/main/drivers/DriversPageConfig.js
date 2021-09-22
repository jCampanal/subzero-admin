import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const DriversPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/drivers',
            component: React.lazy(() => import('./DriversPage')),
        },
    ],
};

export default DriversPageConfig;
