import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const CoolersPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/coolers',
            component: React.lazy(() => import('./Coolers/Coolers')),
        },
    ],
};

export default CoolersPageConfig;
