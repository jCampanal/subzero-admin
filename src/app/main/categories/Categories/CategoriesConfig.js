import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'categories', en);
i18next.addResourceBundle('es', 'categories', es);

const CategoriesConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/categories',
            exact: true,
            component: React.lazy(() => import('./Categories').then((categories) => categories)),
        },
    ],
};

export default CategoriesConfig;
