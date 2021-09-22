import i18next from 'i18next';
import CoolersPage from './CoolersPage';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const CoolersPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/coolers',
            component: CoolersPage,
        },
    ],
};

export default CoolersPageConfig;
