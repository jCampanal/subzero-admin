import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'category-delete', en);
i18next.addResourceBundle('es', 'category-delete', es);

const CategoryDeleteConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/category/:id/delete',
            exact: true,
            component: React.lazy(() => import('./CategoryDelete')),
        },
    ],
};

export default CategoryDeleteConfig;
