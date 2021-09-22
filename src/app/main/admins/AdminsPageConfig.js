import i18next from 'i18next';
import AdminsPage from './AdminsPage';
import en from './i18n/en';

i18next.addResourceBundle('en', 'examplePage', en);

const AdminsPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/admins',
            component: AdminsPage,
        },
    ],
};

export default AdminsPageConfig;
