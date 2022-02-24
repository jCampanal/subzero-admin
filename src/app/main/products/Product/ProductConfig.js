import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'product', en);
i18next.addResourceBundle('es', 'product', es);

const ProductConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/product/:id',
            exact: true,
            component: React.lazy(() => import('./Product').then((product) => product)),
        },
    ],
};

export default ProductConfig;
