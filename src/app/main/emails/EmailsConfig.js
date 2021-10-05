import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import es from './i18n/es';

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
            component: React.lazy(() => import('./Emails/Emails')),
        },
    ],
};

export default EmailsConfig;
