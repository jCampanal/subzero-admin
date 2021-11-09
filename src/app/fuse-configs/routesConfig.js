import React from 'react';
import {Redirect} from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import LoginPageConfig from 'app/pages/login/LoginPageConfig';
import DashboardConfig from 'app/main/dashboard/DashboardConfig';
import CategoriesPageConfig from 'app/main/categories/Categories/CategoriesConfig';
import ProductsPageConfig from 'app/main/products/ProductsPageConfig';
import CoolersPageConfig from 'app/main/coolers/Coolers/CoolersPageConfig';
import SchedulesPageConfig from 'app/main/schedules/SchedulesPageConfig';
import CoolersActivityPageConfig from 'app/main/coolers-activity/CoolersActivityPageConfig';
import CustomersConfig from 'app/main/customers/Customers/CustomersConfig';
import DriversPageConfig from 'app/main/drivers/DriversPageConfig';
import OrdersAdminConfig from 'app/main/orders-admin/OrdersAdminConfig';
import WarehousesConfig from 'app/main/warehouses/Warehouses/WarehousesConfig';
import AdminsConfig from 'app/main/admins/AdminsConfig';
import ShipmentsPageConfig from 'app/main/shipments/ShipmentsPageConfig';
import EmailsConfig from 'app/main/emails/Emails/EmailsConfig';
import BlacklistConfig from 'app/main/blacklist/BlacklistConfig';
import OrdersMonitorConfig from 'app/main/orders-monitor/OrdersMonitorConfig';
import OrderCalendarPageConfig from 'app/main/order-calendar/OrderCalendarPageConfig';
import DriversMonitorPageConfig from 'app/main/drivers-monitor/DriversMonitorPageConfig';
import CategoryFormConfig from '../main/categories/CategoryForm/CategoryFormConfig';
import CategoryConfig from '../main/categories/Category/CategoryConfig';
import ProductFormConfig from '../main/products/Products/ProductForm/ProductFormConfig';
import SaleUnitFormConfig from '../main/products/Products/SaleUnitForm/SaleUnitFormConfig';
import CoolerFormConfig from '../main/coolers/CoolersForm/CoolerFormConfig';
import ProvidersConfig from '../main/providers/Providers/ProvidersConfig';
import ProvidersFormConfig from '../main/providers/ProvidersForm/ProvidersFormConfig';
import ProvidersShowConfig from '../main/providers/ShowProvider/ProvidersShowConfig';
import WarehouseFormConfig from '../main/warehouses/WarehouseForm/WarehouseFormConfig';

const routeConfigs = [
    LoginPageConfig,
    DashboardConfig,
    CategoriesPageConfig,
    CategoryConfig,
    CategoryFormConfig,
    ProductsPageConfig,
    ProductFormConfig,
    SaleUnitFormConfig,
    CoolersPageConfig,
    CoolerFormConfig,
    CoolersActivityPageConfig,
    ProvidersConfig,
    ProvidersFormConfig,
    ProvidersShowConfig,
    CustomersConfig,
    SchedulesPageConfig,
    DriversPageConfig,
    OrdersAdminConfig,
    WarehousesConfig,
    WarehouseFormConfig,
    AdminsConfig,
    ShipmentsPageConfig,
    EmailsConfig,
    BlacklistConfig,
    OrdersMonitorConfig,
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
