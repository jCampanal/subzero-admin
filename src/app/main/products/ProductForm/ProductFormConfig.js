import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'product-form', en);
i18next.addResourceBundle('es', 'product-form', es);

const CategoriesPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/products/create',
            exact: true,
            component: React.lazy(() => import('./ProductForm')),
        },
        {
            path: '/products/:id/edit',
            exact: true,
            component: React.lazy(() => import('./ProductForm')),
        },
    ],
};

export default CategoriesPageConfig;
