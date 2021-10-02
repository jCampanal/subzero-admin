import React from 'react';
import {Redirect} from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import LoginPageConfig from 'app/pages/login/LoginPageConfig';
import DashboardPageConfig from 'app/main/dashboard/DashboardPageConfig';
import CategoriesPageConfig from 'app/main/categories/CategoriesPageConfig';
import ProductsPageConfig from 'app/main/products/ProductsPageConfig';
import CoolersPageConfig from 'app/main/coolers/CoolersPageConfig';
import SchedulesPageConfig from 'app/main/schedules/SchedulesPageConfig';
import CoolersActivityPageConfig from 'app/main/coolers-activity/CoolersActivityPageConfig';
import CustomersConfig from 'app/main/customers/CustomersConfig';
import DriversPageConfig from 'app/main/drivers/DriversPageConfig';
import OrdersAdminConfig from 'app/main/orders-admin/OrdersAdminConfig';
import WarehousesConfig from 'app/main/warehouses/WarehousesConfig';
import AdminsConfig from 'app/main/admins/AdminsConfig';
import ShipmentsPageConfig from 'app/main/shipments/ShipmentsPageConfig';
import EmailsConfig from 'app/main/emails/EmailsConfig';
import BlacklistConfig from 'app/main/blacklist/BlacklistConfig';
import OrderMonitorPageConfig from 'app/main/order-monitor/OrderMonitorPageConfig';
import OrderCalendarPageConfig from 'app/main/order-calendar/OrderCalendarPageConfig';
import DriversMonitorPageConfig from 'app/main/drivers-monitor/DriversMonitorPageConfig';

const routeConfigs = [
    LoginPageConfig,
    DashboardPageConfig,
    CategoriesPageConfig,
    ProductsPageConfig,
    CoolersPageConfig,
    CoolersActivityPageConfig,
    CustomersConfig,
    SchedulesPageConfig,
    DriversPageConfig,
    OrdersAdminConfig,
    WarehousesConfig,
    AdminsConfig,
    ShipmentsPageConfig,
    EmailsConfig,
    BlacklistConfig,
    OrderMonitorPageConfig,
    OrderCalendarPageConfig,
    DriversMonitorPageConfig,
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
