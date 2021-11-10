import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

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
            exact: true,
            component: React.lazy(() => import('./Blacklist').then((blacklist) => blacklist)),
        },
    ],
};

export default BlacklistConfig;
