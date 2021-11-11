import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'sale-unit-form', en);
i18next.addResourceBundle('es', 'sale-unit-form', es);

const CategoriesPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/products/sale-unit/create',
            exact: true,
            component: React.lazy(() => import('./SaleUnitForm')),
        },
        {
            path: '/products/sale-unit/:id/edit',
            exact: true,
            component: React.lazy(() => import('./SaleUnitForm')),
        },
    ],
};

export default CategoriesPageConfig;
