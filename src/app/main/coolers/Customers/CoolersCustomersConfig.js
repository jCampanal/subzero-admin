import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'coolers-customers', en);
i18next.addResourceBundle('es', 'coolers-customers', es);

const CoolersCustomersConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/coolers/customers',
            exact: true,
            component: React.lazy(() => import('./CoolersCustomers').then((customers) => customers)),
        },
    ],
};

export default CoolersCustomersConfig;
