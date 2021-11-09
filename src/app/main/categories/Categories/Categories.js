import React, {lazy, memo, useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {getCategories} from '../../../api-conn/categories';
import rows from './rows';
import FuseLoading from '../../../../@fuse/core/FuseLoading';
import {showMessage} from '../../../store/fuse/messageSlice';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader').then((header) => header));
const CategoriesTable = lazy(() => import('./CategoriesTable').then((table) => table));

function Categories() {
    const {
        user: {logged},
    } = useSelector((state) => state);
    const history = useHistory();
    const {t} = useTranslation('categories');
    const dispatch = useDispatch();
    const [categories, populateCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCategories = () => {
        setLoading(true);
        getCategories()
            .then((data) => {
                populateCategories(data.data);
                setLoading(false);
            })
            .catch(() => {
                dispatch(
                    showMessage({
                        message: 'We are facing problems trying to get categories list, please try again later',
                        variant: 'error',
                    })
                );
                setLoading(false);
            });
    };
    const createCategory = () => {
        history.push('/categories/create');
    };
    const editCategory = (categoryId) => {
        const category = categories.filter((item) => item.id === categoryId)[0];
        history.push(`/categories/${categoryId}/edit`, {category});
    };

    useEffect(() => {
        if (!logged) history.push('/login');
    }, [logged, history]);
    useEffect(() => {
        document.title = 'Categories - Subzero Ice Services';
    }, []);
    useEffect(loadCategories, [dispatch]);

    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={
                <Header
                    iconText="category"
                    title={t('CATEGORIES')}
                    addButtonLabel={t('ADD_CATEGORY')}
                    addButtonCallback={createCategory}
                    searchHint={t('SEARCH_BY_NAME')}
                />
            }
            content={loading ? <FuseLoading /> : <CategoriesTable categories={categories} rows={rows} editCallback={editCategory} />}
            innerScroll
        />
    );
}

export default memo(Categories);
