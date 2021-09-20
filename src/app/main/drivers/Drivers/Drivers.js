import {memo} from 'react';
import {Button} from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const dummyDrivers = [
    {id: 1, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 2, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 3, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 4, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 5, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 6, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 7, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 8, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 9, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
];

function Drivers() {
    return (
        <div>
            <p className="h1">
                <LocalShippingIcon className="text-5xl mr-14" />
                Drivers <span className="text-gray-50 rounded-full px-16 bg-blue-600">{dummyDrivers.length}</span>
            </p>
            <div className="flex my-16 justify-center">
                <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white">
                    New driver
                </Button>
            </div>
            <div className="mt-2 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                                <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                                    <tr className="text-left tracking-wider border-t border-b">
                                        <th scope="col" className="px-14 py-3">
                                            Username
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Full name
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Warehouse
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dummyDrivers.map((item) => (
                                        <tr key={item.id} className="odd:bg-gray-200 hover:bg-gray-100">
                                            <td className="px-14 py-3">{item.username}</td>
                                            <td className="px-14 py-3">{item.name}</td>
                                            <td className="px-14 py-3">{item.warehouse}</td>
                                            <td className="px-14 py-3">
                                                <div className="flex justify-end items-center">
                                                    <Button type="button" className="text-sm text-gray-700 hover:text-gray-800 leading-none rounded-md mr-5">
                                                        <i className="fa fa-paper-plane mr-4" />
                                                        Send test order
                                                    </Button>
                                                    <Button type="button" className="text-sm text-green-700 hover:text-green-800 leading-none rounded-md mr-5">
                                                        <i className="fa fa-check mr-4" />
                                                        Enable
                                                    </Button>
                                                    <Button type="button" className="text-sm text-gray-700 hover:text-gray-800 leading-none rounded-md mr-5">
                                                        <i className="fa fa-edit mr-4" />
                                                        Edit
                                                    </Button>
                                                    <Button type="button" className="text-sm text-red-700 hover:text-red-800 leading-none rounded-md">
                                                        <i className="fa fa-trash mr-4" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Drivers);
