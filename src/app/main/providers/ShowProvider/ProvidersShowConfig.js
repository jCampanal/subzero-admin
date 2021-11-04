import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'providers-show', en);
i18next.addResourceBundle('es', 'providers-show', es);

const ProvidersShowConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/providers/:id',
            exact: true,
            component: React.lazy(() => import('./ProvidersShow').then((show) => show)),
        },
    ],
};

export default ProvidersShowConfig;
