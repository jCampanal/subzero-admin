import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'admins', en);
i18next.addResourceBundle('es', 'admins', es);

const AdminsConfig = {
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

export default AdminsConfig;
