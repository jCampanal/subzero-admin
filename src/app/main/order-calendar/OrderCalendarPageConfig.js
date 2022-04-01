import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'orders-calendar', en);
i18next.addResourceBundle('es', 'orders-calendar', es);

const OrderCalendarPageConfig = {
    settings: {
        layout: {
            config: {        
              navbar: {
                display: false,
                folded: false,
                position: "left",
              },
              toolbar: {
                display: false,
                style: "fixed",
                position: "below",
              },},
        },
    },
    routes: [
        {
            path: '/orders_calendar',
            component: React.lazy(() => import('./OrderCalendar/OrderCalendar')),
        },
    ],
};

export default OrderCalendarPageConfig;
