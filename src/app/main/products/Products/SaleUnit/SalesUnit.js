import FusePageCarded from '@fuse/core/FusePageCarded';
import React, {lazy, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getProducts} from '../../../api-conn/products';
import {showMessage} from '../../../store/fuse/messageSlice';

const Header = lazy(() => import('./PageCardedHeader'));
const ProductsTable = lazy(() => import('./SaleUnitsTable'));

const rows = [
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'NAME',
        sort: true,
    },
    {
        id: 'value',
        align: 'right',
        disablePadding: false,
        label: 'VALUE',
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

function SalesUnit() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {t} = useTranslation('products');
    const logged = useSelector((state) => state.user.logged);
    const [products, setProducts] = useState([]);
    const loadProducts = async () => {
        await getProducts()
            .then((data) => setProducts(data.data))
            .catch(() => {
                setProducts([]);
                dispatch(
                    showMessage({
                        message: t('PROBLEM_FETCHING'),
                    })
                );
            });
    };
    useEffect(() => {
        loadProducts().finally();
    }, []);
    if (!logged) return <Redirect to="/login" />;
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

export default memo(SalesUnit);
