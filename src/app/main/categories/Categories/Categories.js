import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useTranslation} from 'react-i18next';

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
const dummyCategories = [
    {id: 1, link: 'htp://site.com/cats/gue', name: 'Gue'},
    {id: 2, link: 'htp://site.com/cats/gue', name: 'Gue'},
    {id: 3, link: 'htp://site.com/cats/gue', name: 'Gue'},
    {id: 4, link: 'htp://site.com/cats/gue', name: 'Gue'},
    {id: 5, link: 'htp://site.com/cats/gue', name: 'Gue'},
    {id: 6, link: 'htp://site.com/cats/gue', name: 'Gue'},
    {id: 7, link: 'htp://site.com/cats/gue', name: 'Gue'},
    {id: 8, link: 'htp://site.com/cats/gue', name: 'Gue'},
    {id: 9, link: 'htp://site.com/cats/gue', name: 'Gue'},
];

function Categories() {
    const {t} = useTranslation('categories');
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="category" title={t('CATEGORIES')} addButtonLabel={t('ADD_CATEGORY')} searchHint={t('SEARCH_BY_NAME')} />}
            content={<CategoriesTable categories={dummyCategories} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Categories);
