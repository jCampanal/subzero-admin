import React, {useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useParams} from 'react-router';
import CategoryHeader from './CategoryHeader';
import {getCategory} from '../../../api-conn/categories';
import FuseLoading from '../../../../@fuse/core/FuseLoading';

const Category = () => {
    const {id} = useParams();
    const [category, setCategory] = useState({});
    const loadCategory = () => {
        getCategory(id).then((data) => setCategory(data.data));
    };
    useEffect(loadCategory, [id]);
    if (category.id) {
        return (
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<CategoryHeader category={category} />}
            />
        );
    }
    return <FuseLoading />;
};

export default Category;
