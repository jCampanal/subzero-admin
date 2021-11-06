import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'customers', en);
i18next.addResourceBundle('es', 'customers', es);

const CustomersConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/customers',
            exact: true,
            component: React.lazy(() => import('./Customers').then((customers) => customers)),
        },
    ],
};

export default CustomersConfig;
