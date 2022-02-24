import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'sales-unit', en);
i18next.addResourceBundle('es', 'sales-unit', es);

const ProductsPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/products/sales-unit',
            exact: true,
            component: React.lazy(() => import('./SalesUnit')),
        },
    ],
};

export default ProductsPageConfig;
