import i18next from 'i18next';
import React from 'react';
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
            component: React.lazy(() => import('./WarehousesPage')),
        },
    ],
};

export default WarehousesPageConfig;
