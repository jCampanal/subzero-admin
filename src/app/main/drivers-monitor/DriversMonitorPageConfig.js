import i18next from 'i18next';
import DriversMonitorPage from './DriversMonitorPage';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const DriversMonitorPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/drivers_monitor',
            component: DriversMonitorPage,
        },
    ],
};

export default DriversMonitorPageConfig;
