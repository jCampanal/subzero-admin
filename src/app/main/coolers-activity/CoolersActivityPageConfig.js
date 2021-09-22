import i18next from 'i18next';
import CoolersActivityPage from './CoolersActivityPage';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const CoolersActivityPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/coolers_activity',
            component: CoolersActivityPage,
        },
    ],
};

export default CoolersActivityPageConfig;
