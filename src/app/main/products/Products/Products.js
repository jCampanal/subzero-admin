import FusePageCarded from '@fuse/core/FusePageCarded';
import React, {lazy, memo} from 'react';
import {useTranslation} from 'react-i18next';

const Header = lazy(() => import('./PageCardedHeader'));
const ProductsTable = lazy(() => import('./ProductsTable'));

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
        id: 'category',
        align: 'left',
        disablePadding: false,
        label: 'CATEGORY',
        sort: true,
    },
    {
        id: 'units',
        align: 'right',
        disablePadding: false,
        label: 'UNITS',
        sort: true,
    },
    {
        id: 'visible',
        align: 'right',
        disablePadding: false,
        label: 'VISIBLE',
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

const dummyProducts = [
    {
        id: 1,
        category: 'Lorem',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 2,
        category: 'Dolor',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 3,
        category: 'Ipsum',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 4,
        category: 'Dolor',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 5,
        category: 'Dolor',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 6,
        category: 'Lorem',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 7,
        category: 'Ipsum',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 8,
        category: 'Ipsum',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 9,
        category: 'Lorem',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 10,
        category: 'Lorem',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
    {
        id: 11,
        category: 'Lorem',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: false,
    },
    {
        id: 12,
        category: 'Lorem',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: false,
    },
    {
        id: 13,
        category: 'Lorem',
        name: 'Grep',
        units: 'Gue Ueg Egu Geu',
        visible: true,
    },
];

function Products() {
    const {t} = useTranslation('products');
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="shopping_cart" title={t('PRODUCTS')} addButtonLabel={t('ADD_PRODUCT')} searchHint={t('SEARCH_BY_NAME')} />}
            content={<ProductsTable products={dummyProducts} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Products);
