import i18next from 'i18next';
import WarehousesPage from './WarehousesPage';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const WarehousesPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/warehouses',
            component: WarehousesPage,
        },
    ],
};

export default WarehousesPageConfig;
