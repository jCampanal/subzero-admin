import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const OrderCalendarPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/orders_calendar',
            component: React.lazy(() => import('./OrderCalendarPage')),
        },
    ],
};

export default OrderCalendarPageConfig;
