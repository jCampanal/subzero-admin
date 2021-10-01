import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

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
            component: React.lazy(() => import('./Customers/Customers')),
        },
    ],
};

export default CustomersConfig;
