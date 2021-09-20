import {memo} from 'react';
import {Button} from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const dummyAdmins = [
    {id: 1, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 2, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 3, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 4, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 5, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 6, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 7, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
];

function Admins() {
    return (
        <div>
            <p className="h1">
                <SupervisorAccountIcon className="text-5xl mr-14" />
                Admins <span className="text-gray-50 rounded-full px-16 bg-blue-600">{dummyAdmins.length}</span>
            </p>
            <div className="flex my-16 justify-center">
                <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white">
                    New admin
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
                                            Id
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            First name
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Last name
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Phone number
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dummyAdmins.map((item) => (
                                        <tr key={item.id} className="odd:bg-gray-200 hover:bg-gray-100">
                                            <td className="px-14 py-3">{item.id}</td>
                                            <td className="px-14 py-3">{item.firstName}</td>
                                            <td className="px-14 py-3">{item.lastName}</td>
                                            <td className="px-14 py-3">{item.phoneNumber}</td>
                                            <td className="px-14 py-3">
                                                <div className="flex justify-end items-center">
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

export default memo(Admins);
