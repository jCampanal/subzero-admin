import i18next from 'i18next';
import React from 'react';
import en from './translations/en';
import es from './translations/es';

i18next.addResourceBundle('en', 'emails', en);
i18next.addResourceBundle('es', 'emails', es);

const EmailsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/emails',
            exact: true,
            component: React.lazy(() => import('./Emails').then((emails) => emails)),
        },
    ],
};

export default EmailsConfig;
