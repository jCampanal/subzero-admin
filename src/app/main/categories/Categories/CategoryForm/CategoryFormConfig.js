import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'category-form', en);
i18next.addResourceBundle('es', 'category-form', es);

const CategoriesPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/categories/create',
            exact: true,
            component: React.lazy(() => import('./CategoryForm')),
        },
        {
            path: '/categories/:id/edit',
            exact: true,
            component: React.lazy(() => import('./CategoryForm')),
        },
    ],
};

export default CategoriesPageConfig;
