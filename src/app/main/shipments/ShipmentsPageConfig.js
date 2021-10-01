import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'shipments', en);
i18next.addResourceBundle('es', 'shipments', es);

const ShipmentsPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/shipments',
            component: React.lazy(() => import('./Shipments/Shipments')),
        },
    ],
};

export default ShipmentsPageConfig;
