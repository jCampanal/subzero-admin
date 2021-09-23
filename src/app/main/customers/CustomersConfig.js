import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

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
