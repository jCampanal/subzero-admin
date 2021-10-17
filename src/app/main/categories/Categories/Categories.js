import React, {lazy, memo, useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useTranslation} from 'react-i18next';
import {getCategories} from '../../../api-conn/categories';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader'));
const CategoriesTable = lazy(() => import('./CategoriesTable'));

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
        id: 'link',
        align: 'left',
        disablePadding: false,
        label: 'LINK',
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

function Categories() {
    const {t} = useTranslation('categories');
    const [categories, populateCategories] = useState([]);
    const loadCategories = () => {
        getCategories()
            .then((data) => populateCategories(data.data))
            .catch((error) => console.log(error));
    };
    useEffect(loadCategories, []);
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="category" title={t('CATEGORIES')} addButtonLabel={t('ADD_CATEGORY')} searchHint={t('SEARCH_BY_NAME')} />}
            content={<CategoriesTable categories={categories} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Categories);
