import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import {useTranslation} from 'react-i18next';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader'));
const WarehousesTable = lazy(() => import('./WarehousesTable'));
const rows = [
    {
        id: 'image',
        align: 'left',
        disablePadding: true,
        label: '',
        sort: false,
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'NAME',
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
const dummyWarehouses = [
    {id: 1, name: 'Gue Ipsum'},
    {id: 2, name: 'Gue Ipsum'},
    {id: 3, name: 'Gue Ipsum'},
    {id: 4, name: 'Gue Ipsum'},
    {id: 5, name: 'Gue Ipsum'},
    {id: 6, name: 'Gue Ipsum'},
    {id: 7, name: 'Gue Ipsum'},
    {id: 8, name: 'Gue Ipsum'},
];

function Warehouses() {
    const {t} = useTranslation('warehouses');
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="store" title={t('WAREHOUSES')} addButtonLabel={t('ADD_WAREHOUSE')} searchHint={t('SEARCH_BY_NAME')} />}
            content={<WarehousesTable warehouses={dummyWarehouses} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Warehouses);
