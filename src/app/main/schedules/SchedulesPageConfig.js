import i18next from 'i18next';
import SchedulesPage from './SchedulesPage';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const SchedulesPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/schedules',
            component: SchedulesPage,
        },
    ],
};

export default SchedulesPageConfig;
