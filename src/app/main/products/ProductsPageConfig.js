import i18next from 'i18next';
import ProductsPage from './ProductsPage';
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
            component: ProductsPage,
        },
    ],
};

export default ProductsPageConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/dashboard',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
