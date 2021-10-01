import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'drivers', en);
i18next.addResourceBundle('es', 'drivers', es);

const DriversPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/drivers',
            component: React.lazy(() => import('./Drivers/Drivers')),
        },
    ],
};

export default DriversPageConfig;
