import i18next from 'i18next';
import DriversPage from './DriversPage';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const DriversPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/drivers',
            component: DriversPage,
        },
    ],
};

export default DriversPageConfig;
