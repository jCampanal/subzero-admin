import i18next from 'i18next';
import EmailsPage from './EmailsPage';
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
            component: EmailsPage,
        },
    ],
};

export default EmailsPageConfig;
