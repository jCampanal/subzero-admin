import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation, useParams} from 'react-router';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import {useSelector} from 'react-redux';
import FormHeader from './FormHeader';
import FormControls from './FormControls';

const WarehouseForm = () => {
    const {
        user: {logged},
    } = useSelector((state) => state);
    const {t} = useTranslation('warehouse-form');
    const {id} = useParams();
    const {state} = useLocation();
    const history = useHistory();
    const warehouse = id ? state.warehouse : undefined;
    const methods = useForm({
        defaultValues: {
            name: id ? warehouse.name : '',
            street: id ? warehouse.address.street : '',
            city: id ? warehouse.address.city : '',
            state: id ? warehouse.address.state : '',
            zipCode: id ? warehouse.address.zipCode : '',
            addressId: id ? warehouse.address.id : undefined,
        },
    });

    useEffect(() => {
        if (!logged) history.push('/login');
    }, [logged, history]);
    useEffect(() => {
        document.title = id ? t('PAGE_TITLE_EDITING') : t('PAGE_TITLE_CREATING');
    }, [id, t]);

    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<FormHeader removeCallback={() => null} />}
                contentToolbar={<div className="p-16 sm:p-24 max-w-2xl">{id ? <h1>{warehouse.name}</h1> : <h1>{t('CREATE_NEW')}</h1>}</div>}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <FormControls />
                    </div>
                }
            />
        </FormProvider>
    );
};

export default WarehouseForm;
