import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'categories', en);
i18next.addResourceBundle('es', 'categories', es);

const CategoriesPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/categories',
            component: React.lazy(() => import('./Categories/Categories')),
        },
    ],
};

export default CategoriesPageConfig;
