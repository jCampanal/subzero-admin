import FusePageCarded from '@fuse/core/FusePageCarded';
import React, {lazy, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../../api-conn/products';
import {showMessage} from '../../../store/fuse/messageSlice';

const Header = lazy(() => import('./PageCardedHeader').then((header) => header));
const ProductsTable = lazy(() => import('./ProductsTable').then((table) => table));

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
    const dispatch = useDispatch();
    const {t} = useTranslation('products');
    const {
        user: {logged},
    } = useSelector((state) => state);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!logged) history.push('/login');
    }, [logged, history]);
    useEffect(() => {
        document.title = 'Products - Subzero Ice Services';
    }, []);
    useEffect(() => {
        const loadProducts = async () => {
            await getProducts()
                .then((data) => setProducts(data.data))
                .catch(() => {
                    setProducts([]);
                    dispatch(
                        showMessage({
                            message: t('PROBLEM_FETCHING'),
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                            },
                            variant: 'error',
                        })
                    );
                });
        };
        loadProducts().finally();
    }, [dispatch, t]);

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
            content={<ProductsTable data={products} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Products);
