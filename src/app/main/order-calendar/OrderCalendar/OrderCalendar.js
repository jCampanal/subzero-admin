import {lazy, memo} from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';

const OrdersByDateTab = lazy(() => import('./OrdersByDateTab'));

const Days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
};
const dummyCompanies = [
    'posuere',
    'sollicitudin',
    'aliquam',
    'ultrices',
    'sagittis',
    'orci a scelerisque',
    'purus semper',
    'eget duis at tellus',
    'at urna',
    'condimentum',
    'mattis pellentesque',
    'id nibh',
    'tortor id aliquet',
    'lectus proin',
    'nibh nisl',
    'condimentum',
    'id venenatis',
    'a condimentum',
    'vitae sapien',
    'pellentesque',
    'habitant morbi',
    'tristique',
    'senectus',
    'et netus',
    'et malesuada',
    'fames ac turpis',
    'egestas',
    'sed tempus',
    'urna et pharetra',
    'pharetra',
    'massa massa',
    'ultricies mi quis',
    'hendrerit dolor',
    'magna eget est lorem',
    'ipsum dolor',
    'sit amet consectetur',
    'adipiscing elit pellentesque',
    'habitant morbi',
    'tristique senectus',
    'et netus et malesuada',
    'fames ac turpis',
    'egestas integer eget',
    'aliquet nibh praesent',
    'tristique magna',
    'sit amet purus',
    'gravida quis',
    'blandit turpis',
    'cursus',
];
const now = new Date();
const future = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
const dates = [now];
let currentTime = now.getTime();
const lastTime = future.getTime();
while (currentTime <= lastTime) {
    const newDate = new Date(currentTime);
    currentTime = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
    dates.push(new Date(currentTime));
}

const dummyOrders = dummyCompanies.map((company, index) => ({
    id: index,
    companyName: company,
    arriveTime: new Date(now.getTime() + Math.random() * (future.getTime() - now.getTime())),
    products: {
        dryIce: Math.round(Math.random() * 500),
        pellets: Math.round(Math.random() * 500),
        blasting: Math.round(Math.random() * 500),
    },
}));

function OrderCalendar() {
    return (
        <div>
            <p className="h1">
                <DateRangeIcon className="text-5xl mr-14" />
                Order Calendar <span className="text-gray-50 rounded-full px-16 bg-blue-600">{dummyOrders.length}</span>
            </p>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg my-14">
                <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                    <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                        <tr className="text-left tracking-wider border-t border-b">
                            <th scope="col" className="px-14 py-3">
                                Product
                            </th>
                            {dates.slice(0, 7).map((date) => (
                                <th scope="col" className="px-14 py-3">
                                    {`${Days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`}
                                </th>
                            ))}
                            <th scope="col" className="px-14 py-3">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="odd:bg-gray-200 hover:bg-gray-100">
                            <td className="px-14 py-3">Dry Ice</td>
                            {dates.slice(0, 7).map((date) => (
                                <td className="px-14 py-3">
                                    {dummyOrders
                                        .filter((item) => item.arriveTime.getDate() === date.getDate())
                                        .reduce((total, currentValue) => total + currentValue.products.dryIce, 0)}
                                </td>
                            ))}
                            <td className="px-14 py-3">
                                {dates
                                    .slice(0, 7)
                                    .map((date) =>
                                        dummyOrders
                                            .filter((item) => item.arriveTime.getDate() === date.getDate())
                                            .reduce((total, currentValue) => total + currentValue.products.dryIce, 0)
                                    )
                                    .reduce((total, value) => total + value, 0)}
                            </td>
                        </tr>
                        <tr className="odd:bg-gray-200 hover:bg-gray-100">
                            <td className="px-14 py-3">Pellets</td>
                            {dates.slice(0, 7).map((date) => (
                                <td className="px-14 py-3">
                                    {dummyOrders
                                        .filter((item) => item.arriveTime.getDate() === date.getDate())
                                        .reduce((total, currentValue) => total + currentValue.products.pellets, 0)}
                                </td>
                            ))}
                            <td className="px-14 py-3">
                                {dates
                                    .slice(0, 7)
                                    .map((date) =>
                                        dummyOrders
                                            .filter((item) => item.arriveTime.getDate() === date.getDate())
                                            .reduce((total, currentValue) => total + currentValue.products.pellets, 0)
                                    )
                                    .reduce((total, value) => total + value, 0)}
                            </td>
                        </tr>
                        <tr className="odd:bg-gray-200 hover:bg-gray-100">
                            <td className="px-14 py-3">Blasting</td>
                            {dates.slice(0, 7).map((date) => (
                                <td className="px-14 py-3">
                                    {dummyOrders
                                        .filter((item) => item.arriveTime.getDate() === date.getDate())
                                        .reduce((total, currentValue) => total + currentValue.products.blasting, 0)}
                                </td>
                            ))}
                            <td className="px-14 py-3">
                                {dates
                                    .slice(0, 7)
                                    .map((date) =>
                                        dummyOrders
                                            .filter((item) => item.arriveTime.getDate() === date.getDate())
                                            .reduce((total, currentValue) => total + currentValue.products.blasting, 0)
                                    )
                                    .reduce((total, value) => total + value, 0)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <OrdersByDateTab tabHeaders={dates} tabItems={dummyOrders} />
            </div>
        </div>
    );
}

export default memo(OrderCalendar);
