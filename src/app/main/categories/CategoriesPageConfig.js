import i18next from 'i18next';
import CategoriesPage from './CategoriesPage';
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
            component: CategoriesPage,
        },
    ],
};

export default CategoriesPageConfig;

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
