import {memo} from 'react';
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

function Dashboard() {
    return (
        <div>
            <p className="h1">
                <DashboardIcon className="text-5xl mr-14" />
                Dashboard
            </p>
            <p className="text-xl mt-12 mb-5">Administration</p>
            <div className="p-10 grid grid-cols-7 gap-20">
                <div className="shadow-lg">
                    <Link
                        to="/categories"
                        role="button"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                    >
                        <CategoryIcon className="block text-7xl" />
                        <span className="h5 mt-10">Categories</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/products"
                        role="button"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                    >
                        <ShoppingCartIcon className="block text-7xl" />
                        <span className="h5 mt-10">Products</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/coolers"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <i className="fa text-7xl fa-box block" />
                        <span className="h5 mt-10">Coolers</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/coolers-activity"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <HistoryIcon className="block text-7xl" />
                        <span className="h5 mt-10">Coolers Activity</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/customers"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <PersonIcon className="block text-7xl" />
                        <span className="h5 mt-10">Customers</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/schedules"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <ScheduleIcon className="block text-7xl" />
                        <span className="h5 mt-10">Schedules</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/drivers"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <LocalShippingIcon className="block text-7xl" />
                        <span className="h5 mt-10">Drivers</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/shipments"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <i className="fa text-7xl fa-truck-loading block" />
                        <span className="h5 mt-10">Shipments</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/order-admin"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <AssignmentTurnedInIcon className="block text-7xl" />
                        <span className="h5 mt-10">Order admin</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/warehouses"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <i className="fa text-7xl fa-warehouse block" />
                        <span className="h5 mt-10">Warehouses</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/admins"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <SupervisorAccountIcon className="block text-7xl" />
                        <span className="h5 mt-10">Admins</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/blacklist"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <BlockIcon className="block text-7xl" />
                        <span className="h5 mt-10">Black list</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/emails"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <EmailIcon className="block text-7xl" />
                        <span className="h5 mt-10">Emails</span>
                    </Link>
                </div>
            </div>
            <p className="text-xl mt-12 mb-5">Monitors</p>
            <div className="pt-10 grid grid-cols-7 gap-20">
                <div className="shadow-lg">
                    <Link
                        to="/order-monitor"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <AssignmentIcon className="block text-7xl" />
                        <span className="h5 mt-10">Order monitor</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/order-calendar"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <DateRangeIcon className="block text-7xl" />
                        <span className="h5 mt-10">Order Calendar</span>
                    </Link>
                </div>
                <div className="shadow-lg">
                    <Link
                        to="/categories"
                        className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20 rounded"
                        role="button"
                    >
                        <LocationOnIcon className="block text-7xl" />
                        <span className="h5 mt-10">Driver monitor</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default memo(Dashboard);
