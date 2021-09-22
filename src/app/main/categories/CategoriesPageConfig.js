import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const CategoriesPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/categories',
            component: React.lazy(() => import('./CategoriesPage')),
        },
    ],
};

export default CategoriesPageConfig;
