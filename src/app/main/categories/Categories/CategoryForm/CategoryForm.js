import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useLocation, useParams} from 'react-router';
import FormControls from './FormControls';
import FormHeader from './FormHeader';
import { useTranslation } from 'react-i18next';

const CategoryForm = () => {
    const location = useLocation();
    const {id} = useParams();
    const methods = useForm({
        defaultValues: {
            name: id ? location.state.category.name : '',
            link: id ? location.state.category.link.slice(location.state.category.link.lastIndexOf('/') + 1) : '',
            file: null,
        },
    });
    const {t} = useTranslation('category-form')
    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<FormHeader />}
                contentToolbar={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {id?<h1>{location.state.category.name}</h1>:<h1>{t('CREATE_NEW')}</h1>}
                    </div>
                }
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <FormControls imgUrl={id ? location.state.category.imageURL : ''} />
                    </div>
                }
            />
        </FormProvider>
    );
};

export default CategoryForm;
