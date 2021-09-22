import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const ProductsPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/products',
            component: React.lazy(() => import('./ProductsPage')),
        },
    ],
};

export default ProductsPageConfig;
