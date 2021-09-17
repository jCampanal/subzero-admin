import i18next from 'i18next';
import EmailsPage from './EmailsPage';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

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
