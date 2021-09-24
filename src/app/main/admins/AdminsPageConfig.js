import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const AdminsPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/admins',
            component: React.lazy(() => import('./Admins/Admins')),
        },
    ],
};

export default AdminsPageConfig;
