import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const EmailsPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/emails',
            component: React.lazy(() => import('./EmailsPage')),
        },
    ],
};

export default EmailsPageConfig;
