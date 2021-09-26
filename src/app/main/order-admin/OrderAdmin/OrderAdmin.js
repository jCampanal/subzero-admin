import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';

const WarehouseTab = lazy(() => import('./WarehouseTab'));
const Header = lazy(() => import('./PageCardedHeader'));

const rows = [
    {
        id: 'company',
        align: 'left',
        disablePadding: false,
        label: 'Company',
        sort: true,
    },
    {
        id: 'arrive-time',
        align: 'left',
        disablePadding: false,
        label: 'Arrive Time',
        sort: true,
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status',
        sort: true,
    },
    {
        id: 'actions',
        align: 'right',
        disablePadding: false,
        label: '',
        sort: false,
    },
];
const dummyOrders = [
    {
        id: 1,
        name: 'Nascetur',
        orders: [
            {id: 1, company: 'Ridiculus', arriveTime: new Date(), status: 1},
            {id: 2, company: 'MUS', arriveTime: new Date(), status: 2},
            {id: 3, company: 'Mauris', arriveTime: new Date(), status: 3},
            {id: 4, company: 'Vitae', arriveTime: new Date(), status: 1},
            {id: 5, company: 'Ultricies', arriveTime: new Date(), status: 1},
            {id: 6, company: 'LEO', arriveTime: new Date(), status: 2},
        ],
    },
    {
        id: 2,
        name: 'Integer',
        orders: [
            {id: 1, company: 'Ridiculus', arriveTime: new Date(), status: 1},
            {id: 2, company: 'MUS', arriveTime: new Date(), status: 2},
            {id: 3, company: 'Mauris', arriveTime: new Date(), status: 3},
            {id: 4, company: 'Vitae', arriveTime: new Date(), status: 1},
            {id: 5, company: 'Ultricies', arriveTime: new Date(), status: 1},
            {id: 6, company: 'LEO', arriveTime: new Date(), status: 3},
            {id: 7, company: 'Ultricies', arriveTime: new Date(), status: 1},
            {id: 8, company: 'LEO', arriveTime: new Date(), status: 2},
        ],
    },
    {
        id: 3,
        name: 'Malesuada',
        orders: [
            {id: 1, company: 'Ridiculus', arriveTime: new Date(), status: 1},
            {id: 2, company: 'MUS', arriveTime: new Date(), status: 2},
            {id: 3, company: 'Mauris', arriveTime: new Date(), status: 3},
            {id: 4, company: 'Vitae', arriveTime: new Date(), status: 1},
        ],
    },
];

function OrderAdmin() {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header />}
            content={<WarehouseTab tabItems={dummyOrders} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(OrderAdmin);
