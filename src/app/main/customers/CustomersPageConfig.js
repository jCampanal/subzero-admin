import i18next from 'i18next';
import CustomersPage from './CustomersPage';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const CustomersPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/customers',
            component: CustomersPage,
        },
    ],
};

export default CustomersPageConfig;
