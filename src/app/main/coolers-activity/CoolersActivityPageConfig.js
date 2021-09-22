import i18next from 'i18next';
import CoolersActivityPage from './CoolersActivityPage';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

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
