import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'providers', en);
i18next.addResourceBundle('es', 'providers', es);

const ProvidersConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/providers',
            exact: true,
            component: React.lazy(() => import('./Providers').then((providers) => providers)),
        },
    ],
};

export default ProvidersConfig;
