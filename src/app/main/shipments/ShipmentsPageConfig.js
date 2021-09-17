import i18next from 'i18next';
import ShipmentsPage from './ShipmentsPage';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const ShipmentsPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/shipments',
      component: ShipmentsPage,
    },
  ],
};

export default ShipmentsPageConfig;
