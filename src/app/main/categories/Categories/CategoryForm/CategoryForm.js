import FusePageCarded from '@fuse/core/FusePageCarded';
import React, {lazy} from 'react';
import {useParams} from 'react-router';
import {useTranslation} from 'react-i18next';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader'));
const CategoryForm = () => {
    const {id} = useParams();
    const {t} = useTranslation('category-form');
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
                    title={t(id ? 'EDITING_CATEGORY' : 'CREATING_CATEGORY')}
                    addButtonLabel={t('ADD_CATEGORY')}
                    searchHint={t('SEARCH_BY_NAME')}
                />
            }
        />
    );
};

export default CategoryForm;
