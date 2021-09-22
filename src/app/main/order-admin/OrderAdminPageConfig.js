import i18next from 'i18next';
import OrderAdminPage from './OrderAdminPage';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const OrderAdminPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/orders_admin',
            component: OrderAdminPage,
        },
    ],
};

export default OrderAdminPageConfig;
