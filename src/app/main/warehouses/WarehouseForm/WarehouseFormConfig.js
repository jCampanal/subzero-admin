import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'warehouse-form', en);
i18next.addResourceBundle('es', 'warehouse-form', es);

const WarehousesConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/warehouses/create',
            exact: true,
            component: React.lazy(() => import('./WarehouseForm').then((form) => form)),
        },
        {
            path: '/warehouses/:id/edit',
            exact: true,
            component: React.lazy(() => import('./WarehouseForm').then((form) => form)),
        },
    ],
};

export default WarehousesConfig;
