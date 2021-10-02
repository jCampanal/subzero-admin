import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'blacklist', en);
i18next.addResourceBundle('es', 'blacklist', es);

const BlacklistConfig = {
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

export default BlacklistConfig;
