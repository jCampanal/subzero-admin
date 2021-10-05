import React, {lazy, memo} from 'react';
import {useTranslation} from 'react-i18next';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader'));
const ShipmentsTab = lazy(() => import('./ShipmentsTab'));
const rows = [
    {
        id: 'warehouse',
        align: 'left',
        disablePadding: false,
        label: 'WAREHOUSE',
        sort: true,
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'DATE',
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
const dummyShipments = [
    {
        id: 1,
        name: 'Glue',
        shipments: [
            {id: 1, warehouse: 'Lorem', date: new Date()},
            {id: 2, warehouse: 'Lorem', date: new Date()},
            {id: 3, warehouse: 'Lorem', date: new Date()},
        ],
    },
    {
        id: 2,
        name: 'Glue',
        shipments: [{id: 1, warehouse: 'Lorem', date: new Date()}],
    },
    {
        id: 3,
        name: 'Glue',
        shipments: [
            {id: 1, warehouse: 'Lorem', date: new Date()},
            {id: 2, warehouse: 'Lorem', date: new Date()},
            {id: 3, warehouse: 'Lorem', date: new Date()},
            {id: 4, warehouse: 'Lorem', date: new Date()},
            {id: 5, warehouse: 'Lorem', date: new Date()},
        ],
    },
];

function Shipments() {
    const {t} = useTranslation('shipments');
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header title={t('SHIPMENTS')} iconText="fa-truck-loading" addButtonLabel="" />}
            content={<ShipmentsTab tabItems={dummyShipments} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Shipments);
