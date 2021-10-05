import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'coolers', en);
i18next.addResourceBundle('es', 'coolers', es);

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
