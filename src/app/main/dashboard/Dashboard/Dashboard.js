import {memo} from 'react';
import {Link} from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <p className="text-xl mt-12 mb-5">Administration</p>
      <div className="p-10 grid grid-cols-7 gap-20">
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-list block"/>
            <span className="h5 mt-10">Categories</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-shopping-cart block"/>
            <span className="h5 mt-10">Products</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-box block"/>
            <span className="h5 mt-10">Coolers</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-history block"/>
            <span className="h5 mt-10">Coolers Activity</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-user block"/>
            <span className="h5 mt-10">Customers</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-calendar block"/>
            <span className="h5 mt-10">Schedules</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-truck block"/>
            <span className="h5 mt-10">Drivers</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-truck-loading block"/>
            <span className="h5 mt-10">Shipments</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-inbox block"/>
            <span className="h5 mt-10">Order admin</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-warehouse block"/>
            <span className="h5 mt-10">Warehouses</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-user block"/>
            <span className="h5 mt-10">Admins</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-ban block"/>
            <span className="h5 mt-10">Black list</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-envelope block"/>
            <span className="h5 mt-10">Emails</span>
          </Link>
        </div>
      </div>
      <p className="text-xl mt-12 mb-5">Monitors</p>
      <div className="pt-10 grid grid-cols-7 gap-20">
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-tasks block"/>
            <span className="h5 mt-10">Order monitor</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-tasks block"/>
            <span className="h5 mt-10">Order monitor 2</span>
          </Link>
        </div>
        <div className="shadow-lg">
          <Link
            to="/categories"
            className="flex flex-col bg-gray-100 hover:bg-gray-800 text-gray-900 hover:text-gray-50 items-center mx-auto py-20"
            role="button"
          >
            <i className="fa fa-4x fa-map-marked block"/>
            <span className="h5 mt-10">Driver monito</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(Dashboard);
