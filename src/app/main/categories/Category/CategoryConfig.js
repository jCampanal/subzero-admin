import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'category', en);
i18next.addResourceBundle('es', 'category', es);

const CategoryConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/category/:id',
            exact: true,
            component: React.lazy(() => import('./Category').then((category) => category)),
        },
    ],
};

export default CategoryConfig;
