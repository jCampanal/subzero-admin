import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const CoolersActivityPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/coolers_activity',
            component: React.lazy(() => import('./CoolersActivity/CoolersActivity')),
        },
    ],
};

export default CoolersActivityPageConfig;
