import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const OrderMonitorPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/orders_monitor',
            component: React.lazy(() => import('./OrderMonitorPage')),
        },
    ],
};

export default OrderMonitorPageConfig;
