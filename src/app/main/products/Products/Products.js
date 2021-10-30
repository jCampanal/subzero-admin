import FusePageCarded from '@fuse/core/FusePageCarded';
import React, {lazy, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router';
import {useSelector} from 'react-redux';
import {getProducts} from '../../../api-conn/products';

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

function Products() {
    const history = useHistory();
    const {t} = useTranslation('products');
    const loggedUser = useSelector((state) => state.user);
    const [products, setProducts] = useState([]);
    const loadProducts = async () => {
        await getProducts()
            .then((data) => setProducts(data))
            .catch(() => setProducts([]));
    };
    const askForLogin = () => {
        if (!loggedUser.logged) history.push('/login');
    };
    useEffect(() => {
        loadProducts().finally();
    }, []);
    useEffect(askForLogin, []);
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={
                <Header
                    iconText="shopping_cart"
                    title={t('PRODUCTS')}
                    addButtonLabel={t('ADD_PRODUCT')}
                    addButtonCallback={() => history.push('/products/create')}
                    searchHint={t('SEARCH_BY_NAME')}
                />
            }
            content={<ProductsTable products={products} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Products);
