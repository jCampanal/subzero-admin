import i18next from 'i18next';
import OrderMonitorPage from './OrderMonitorPage';
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
            component: OrderMonitorPage,
        },
    ],
};

export default OrderMonitorPageConfig;
