import React, {lazy, memo, useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router';
import {getCategories} from '../../../api-conn/categories';
import rows from './rows';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader'));
const CategoriesTable = lazy(() => import('./CategoriesTable'));

function Categories() {
    const loggedUser = useSelector((state) => state.user);
    const {t} = useTranslation('categories');
    const [categories, populateCategories] = useState([]);
    const loadCategories = () => {
        getCategories()
            .then((data) => populateCategories(data.data))
            .catch((error) => console.log(error));
    };
    useEffect(loadCategories, []);
    const [creatingCategory, toggleCreatingCategory] = useState(false);
    const createCategory = () => {
        toggleCreatingCategory(true);
    };
    if (!loggedUser.logged) return <Redirect to="/login" />;
    if (creatingCategory) return <Redirect to="/categories/create" />;
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
            content={<CategoriesTable categories={categories} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Categories);
