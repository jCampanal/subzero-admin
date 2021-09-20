import {memo} from 'react';
import EmailIcon from '@material-ui/icons/Email';

const dummyEmails = [
    {id: 1, to: 'Gue', subject: 'Ipsum', status: 'new'},
    {id: 2, to: 'Gue', subject: 'Ipsum', status: 'new'},
    {id: 3, to: 'Gue', subject: 'Ipsum', status: 'new'},
    {id: 4, to: 'Gue', subject: 'Ipsum', status: 'new'},
    {id: 5, to: 'Gue', subject: 'Ipsum', status: 'new'},
    {id: 6, to: 'Gue', subject: 'Ipsum', status: 'new'},
    {id: 7, to: 'Gue', subject: 'Ipsum', status: 'new'},
];

function Emails() {
    return (
        <div>
            <p className="h1">
                <EmailIcon className="text-5xl mr-14" />
                Emails <span className="text-gray-50 rounded-full px-16 bg-blue-600">{dummyEmails.length}</span>
            </p>
            <div className="mt-14 flex flex-col">
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
                                            To
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Subject
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dummyEmails.map((item) => (
                                        <tr key={item.id} className="odd:bg-gray-200 hover:bg-gray-100">
                                            <td className="px-14 py-3">{item.id}</td>
                                            <td className="px-14 py-3">{item.to}</td>
                                            <td className="px-14 py-3">{item.subject}</td>
                                            <td className="px-14 py-3">{item.status}</td>
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

export default memo(Emails);
