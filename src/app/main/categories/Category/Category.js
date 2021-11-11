import React, {useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import {useHistory, useLocation} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import CategoryHeader from './CategoryHeader';
import {getCategory} from '../../../api-conn/categories';
import {showMessage} from '../../../store/fuse/messageSlice';
import ProductsTable from '../../products/Products/ProductsTable';
import rows from '../../../common/productRows';

const Category = () => {
    const {
        user: {logged},
    } = useSelector((state) => state);
    const history = useHistory();
    const {state} = useLocation();
    const {t} = useTranslation('category');
    const [category, setCategory] = useState(state.category);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const loadCategory = () => {
        setLoading(true);
        getCategory(category.id)
            .then((data) => {
                setCategory(data.data);
                setLoading(false);
            })
            .catch(() => {
                dispatch(
                    showMessage({
                        message: t('LOADING_FAILED'),
                        variant: 'error',
                    })
                );
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!logged) history.push('/login');
    });
    useEffect(() => {
        document.title = `${category.name} - Subzero Ice services`;
    }, [category.name]);
    useEffect(loadCategory, [category.id, dispatch, t]);

    if (category.id) {
        return (
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<CategoryHeader category={category} />}
                contentToolbar={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <h1>{category.name}</h1>
                    </div>
                }
                content={loading ? <FuseLoading /> : <ProductsTable data={category.products} rows={rows} />}
            />
        );
    }
    return <FuseLoading />;
};

export default Category;
