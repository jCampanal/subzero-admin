import i18next from 'i18next';
import OrderCalendarPage from './OrderCalendarPage';
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
            component: OrderCalendarPage,
        },
    ],
};

export default OrderCalendarPageConfig;
