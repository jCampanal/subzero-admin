import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'products', en);
i18next.addResourceBundle('es', 'products', es);

const ProductsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/products',
            exact: true,
            component: React.lazy(() => import('./Products').then((products) => products)),
        },
    ],
};

export default ProductsConfig;
