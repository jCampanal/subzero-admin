import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const BlacklistPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/blacklist',
            component: React.lazy(() => import('./Blacklist/Blacklist')),
        },
    ],
};

export default BlacklistPageConfig;
