import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useTranslation} from 'react-i18next';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader'));
const DriversTable = lazy(() => import('./DriversTable'));

const rows = [
    {
        id: 'image',
        align: 'left',
        disablePadding: true,
        label: '',
        sort: false,
    },
    {
        id: 'username',
        align: 'left',
        disablePadding: false,
        label: 'USERNAME',
        sort: true,
    },
    {
        id: 'full-name',
        align: 'left',
        disablePadding: false,
        label: 'FULL_NAME',
        sort: true,
    },
    {
        id: 'warehouse',
        align: 'left',
        disablePadding: false,
        label: 'WAREHOUSE',
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
    {id: 10, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 11, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 12, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 13, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 14, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
    {id: 15, username: 'gue', name: 'Gue Ipsum', warehouse: 'Lorem'},
];

function Drivers() {
    const {t} = useTranslation('drivers');
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="local_shipping" title={t('DRIVERS')} addButtonLabel={t('ADD_DRIVER')} searchHint={t('SEARCH_BY_NAME')} />}
            content={<DriversTable drivers={dummyDrivers} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Drivers);
