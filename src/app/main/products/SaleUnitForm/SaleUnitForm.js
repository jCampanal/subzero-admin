import React, {lazy} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useLocation, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';

const FormHeader = lazy(() => import('./FormHeader').then((header) => header));
const FormControls = lazy(() => import('./FormControls').then((header) => header));

const SaleUnitForm = () => {
    const location = useLocation();
    const {id} = useParams();
    const saleUnit = id ? location.state.saleUnit : {};
    const {t} = useTranslation('sale-unit-form');
    const methods = useForm({
        defaultValues: {
            name: id ? saleUnit.name : '',
            value: id ? saleUnit.value : '',
        },
    });
    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<FormHeader />}
                contentToolbar={<div className="p-16 sm:p-24 max-w-2xl">{id ? <h1>{saleUnit.name}</h1> : <h1>{t('CREATE_NEW')}</h1>}</div>}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <FormControls />
                    </div>
                }
            />
        </FormProvider>
    );
};

export default SaleUnitForm;
