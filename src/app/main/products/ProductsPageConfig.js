import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'products', en);
i18next.addResourceBundle('es', 'products', es);

const ProductsPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/products',
            exact: true,
            component: React.lazy(() => import('./Products/Products').then((products) => products)),
        },
    ],
};

export default ProductsPageConfig;
