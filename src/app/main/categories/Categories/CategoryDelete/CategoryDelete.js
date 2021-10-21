import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import {deleteCategory, getCategory} from '../../../../api-conn/categories';
import DeleteHeader from './DeleteHeader';

const CategoryDelete = () => {
    const history = useHistory();
    const {id} = useParams();
    const {t} = useTranslation('category-delete');
    const [category, setCategory] = useState({});
    const loadCategory = () => {
        getCategory(id)
            .then((response) => setCategory(response.data))
            .catch((error) => console.log(error));
    };
    const performDelete = () => {
        deleteCategory(id)
            .then(() => history.push('/categories'))
            .catch((error) => console.log(error));
    };
    useEffect(loadCategory, [id]);
    if (category.id) {
        return (
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<DeleteHeader category={category} />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <div className="flex justify-center">
                            <div>
                                {t('ARE_YOU_SURE')}
                                <div className="mt-16">
                                    <Button
                                        className="whitespace-nowrap mx-4"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => history.push('/categories')}
                                        startIcon={<Icon className="hidden sm:flex">cancel</Icon>}
                                    >
                                        {t('CANCEL')}
                                    </Button>
                                    <Button
                                        className="whitespace-nowrap mx-4"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => performDelete()}
                                        startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                                    >
                                        {t('DELETE')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
    return <FuseLoading />;
};
export default CategoryDelete;
