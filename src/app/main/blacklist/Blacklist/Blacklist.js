import {memo} from 'react';
import {IconButton} from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';

const dummyBlacklist = [
    {id: 1, companyName: 'Gue Amet', bannedWorkers: 2},
    {id: 2, companyName: 'Gue Amet', bannedWorkers: 1},
    {id: 3, companyName: 'Gue Amet', bannedWorkers: 2},
    {id: 4, companyName: 'Gue Amet', bannedWorkers: 1},
    {id: 5, companyName: 'Gue Amet', bannedWorkers: 1},
    {id: 6, companyName: 'Gue Amet', bannedWorkers: 3},
];

function Blacklist() {
    return (
        <div>
            <p className="h1">
                <BlockIcon className="text-5xl mr-14" />
                Blacklist <span className="text-gray-50 rounded-full px-16 bg-blue-600">{dummyBlacklist.length}</span>
            </p>
            <div className="mt-14 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                                <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                                    <tr className="text-left tracking-wider border-t border-b">
                                        <th scope="col" className="px-14 py-3">
                                            <div className="flex justify-between h2">
                                                Indebted companies{' '}
                                                <IconButton aria-label="Add to the blacklist">
                                                    <i className="fa fa-plus-circle text-red-800" />
                                                </IconButton>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dummyBlacklist.map((item) => (
                                        <tr key={item.id} className="odd:bg-gray-200 hover:bg-gray-100">
                                            <td className="px-14 py-3">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <span className="block h3 mb-0">{item.companyName}</span>
                                                        <span className="text-gray-500 italic">Users banned: {item.bannedWorkers}</span>
                                                    </div>
                                                    <IconButton aria-label="Remove from blacklist">
                                                        <i className="fa fa-minus-circle text-green-800" />
                                                    </IconButton>
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

export default memo(Blacklist);
