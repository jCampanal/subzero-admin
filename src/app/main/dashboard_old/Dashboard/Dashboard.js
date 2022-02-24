import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import CategoryIcon from '@material-ui/icons/Category';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BlockIcon from '@material-ui/icons/Block';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import {useTranslation} from 'react-i18next';

function Dashboard() {
    const {t} = useTranslation('dashboard');
    return (
        <div>
            <p className="h1">
                <DashboardIcon className="text-5xl mr-14" />
                {t('DASHBOARD')}
            </p>
            <p className="text-xl mt-12 mb-5">{t('ADMINISTRATION')}</p>
            <div className="p-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-10 xl:grid-cols-12 gap-10 md:gap-16">
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/categories" role="button" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded">
                        <CategoryIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('CATEGORIES')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/products" role="button" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded">
                        <ShoppingCartIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('PRODUCTS')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/coolers" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <i className="fa text-5xl md:text-7xl fa-box block" />
                        <span className="h5 mt-10 text-center px-7">{t('COOLERS')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/coolers_activity" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <HistoryIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('COOLERS_ACTIVITY')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/customers" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <PersonIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('CUSTOMERS')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/schedules" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <ScheduleIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('SCHEDULES')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/drivers" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <LocalShippingIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('DRIVERS')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/shipments" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <i className="fa text-5xl md:text-7xl fa-truck-loading block" />
                        <span className="h5 mt-10 text-center px-7">{t('SHIPMENTS')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/orders_admin" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <AssignmentTurnedInIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('ORDERS_ADMIN')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/warehouses" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <i className="fa text-5xl md:text-7xl fa-warehouse block" />
                        <span className="h5 mt-10 text-center px-7">{t('WAREHOUSES')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/admins" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <SupervisorAccountIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('ADMINS')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/blacklist" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <BlockIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('BLACKLIST')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/emails" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <EmailIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('EMAILS')}</span>
                    </Link>
                </div>
            </div>
            <p className="text-xl mt-12 mb-5">{t('MONITORS')}</p>
            <div className="p-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-10 xl:grid-cols-12 gap-10 md:gap-16">
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/orders_monitor" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <AssignmentIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('ORDERS_MONITOR')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/orders_calendar" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <DateRangeIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('ORDERS_CALENDAR')}</span>
                    </Link>
                </div>
                <div className="shadow-sm md:shadow-lg bg-gray-100 hover:bg-gray-800">
                    <Link to="/drivers_monitor" className="flex flex-col text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded" role="button">
                        <LocationOnIcon className="block text-5xl md:text-7xl" />
                        <span className="h5 mt-10 text-center px-7">{t('DRIVERS_MONITOR')}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default memo(Dashboard);
