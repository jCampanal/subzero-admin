import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'warehouses', en);
i18next.addResourceBundle('es', 'warehouses', es);

const WarehousesConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/warehouses',
            component: React.lazy(() => import('./Warehouses/Warehouses')),
        },
    ],
};

export default WarehousesConfig;
