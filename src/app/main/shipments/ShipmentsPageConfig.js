import i18next from 'i18next';
import React from 'react';
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
            component: React.lazy(() => import('./ShipmentsPage')),
        },
    ],
};

export default ShipmentsPageConfig;
