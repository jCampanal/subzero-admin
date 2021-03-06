import i18next from 'i18next';
import en from './navigation-i18n/en';
import es from './navigation-i18n/es';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig = [
    {
        id: 'main',
        title: 'Subzero',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                translate: 'DASHBOARD',
                type: 'item',
                icon: 'dashboard',
                url: '/dashboard',
            },
        ],
    },
    {
        id: 'administration',
        title: 'Administration',
        translate: 'ADMINISTRATION',
        type: 'group',
        children: [
            {
                id: 'categories',
                title: 'Categories',
                translate: 'CATEGORIES',
                type: 'item',
                icon: 'category',
                url: '/categories',
            },
            {
                id: 'products',
                title: 'Products',
                translate: 'PRODUCTS',
                type: 'item',
                icon: 'shopping_cart',
                url: '/products',
            },
            {
                id: 'coolers',
                title: 'Coolers',
                translate: 'COOLERS',
                type: 'item',
                icon: 'fa-box',
                url: '/coolers',
            },
            {
                id: 'coolers_activity',
                title: 'Coolers Activity',
                translate: 'COOLERS_ACTIVITY',
                type: 'item',
                icon: 'history',
                url: '/coolers_activity',
            },
            {
                id: 'customers',
                title: 'Customers',
                translate: 'CUSTOMERS',
                type: 'item',
                icon: 'person',
                url: '/customers',
            },
            {
                id: 'schedules',
                title: 'Schedules',
                translate: 'SCHEDULES',
                type: 'item',
                icon: 'schedule',
                url: '/schedules',
            },
            {
                id: 'drivers',
                title: 'Drivers',
                translate: 'DRIVERS',
                type: 'item',
                icon: 'local_shipping',
                url: '/drivers',
            },
            {
                id: 'shipments',
                title: 'Shipments',
                translate: 'SHIPMENTS',
                type: 'item',
                icon: 'fa-truck-loading',
                url: '/shipments',
            },
            {
                id: 'orders_admin',
                title: 'Orders Admin',
                translate: 'ORDERS_ADMIN',
                type: 'item',
                icon: 'assignment_turned_in',
                url: '/orders_admin',
            },
            {
                id: 'warehouses',
                title: 'Warehouses',
                translate: 'WAREHOUSES',
                type: 'item',
                icon: 'fa-warehouse',
                url: '/warehouses',
            },
            {
                id: 'admins',
                title: 'Admins',
                translate: 'ADMINS',
                type: 'item',
                icon: 'supervisor_account',
                url: '/admins',
            },
            {
                id: 'blacklist',
                title: 'BlackList',
                translate: 'BLACKLIST',
                type: 'item',
                icon: 'block',
                url: '/blacklist',
            },
            {
                id: 'emails',
                title: 'Emails',
                translate: 'EMAILS',
                type: 'item',
                icon: 'email',
                url: '/emails',
            },
        ],
    },
    {
        id: 'monitors',
        title: 'Monitors',
        translate: 'MONITORS',
        type: 'group',
        children: [
            {
                id: 'orders_monitor',
                title: 'Orders Monitor',
                translate: 'ORDERS_MONITOR',
                type: 'item',
                icon: 'assignment',
                url: '/orders_monitor',
                target: '_blank',
            },
            {
                id: 'orders_calendar',
                title: 'Orders Monitor 2',
                translate: 'ORDERS_CALENDAR',
                type: 'item',
                icon: 'date_range',
                url: '/orders_calendar',
                target: '_blank',
            },
            {
                id: 'drivers_monitor',
                title: 'Drivers Monitor',
                translate: 'DRIVERS_MONITOR',
                type: 'item',
                icon: 'location_on',
                url: '/drivers_monitor',
                target: '_blank',
            },
        ],
    },
];

export default navigationConfig;
