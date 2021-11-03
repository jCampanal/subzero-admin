import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'products', en);
i18next.addResourceBundle('es', 'products', es);

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
