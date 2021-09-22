import i18next from 'i18next';
import ShipmentsPage from './ShipmentsPage';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const ShipmentsPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/shipments',
            component: ShipmentsPage,
        },
    ],
};

export default ShipmentsPageConfig;
