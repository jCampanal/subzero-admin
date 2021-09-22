import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const OrderAdminPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/orders_admin',
            component: React.lazy(() => import('./OrderAdminPage')),
        },
    ],
};

export default OrderAdminPageConfig;
