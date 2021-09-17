import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import DashboardPageConfig from 'app/main/dashboard/DashboardPageConfig';
import CategoriesPageConfig from 'app/main/categories/CategoriesPageConfig';
import ProductsPageConfig from 'app/main/products/ProductsPageConfig';
import CoolersPageConfig from 'app/main/coolers/CoolersPageConfig';
import SchedulesPageConfig from 'app/main/schedules/SchedulesPageConfig';
import CoolersActivityPageConfig from 'app/main/coolers-activity/CoolersActivityPageConfig';
import CustomersPageConfig from 'app/main/customers/CustomersPageConfig';

const routeConfigs = [
  DashboardPageConfig,
  CategoriesPageConfig,
  ProductsPageConfig,
  CoolersPageConfig,
  CoolersActivityPageConfig,
  CustomersPageConfig,
  SchedulesPageConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for dashboard:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/dashboard" />,
  },
  {
    path: '/loading',
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: '/404',
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
