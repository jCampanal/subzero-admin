import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

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
            exact: true,
            component: React.lazy(() => import('./Coolers').then((coolers) => coolers)),
        },
    ],
};

export default CoolersPageConfig;
