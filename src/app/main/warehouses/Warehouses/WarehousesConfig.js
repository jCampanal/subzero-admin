import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

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
            exact: true,
            component: React.lazy(() => import('./Warehouses').then((warehouse) => warehouse)),
        },
    ],
};

export default WarehousesConfig;
