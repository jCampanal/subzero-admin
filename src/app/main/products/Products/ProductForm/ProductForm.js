import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useLocation, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import FormControls from './FormControls';
import FormHeader from './FormHeader';
import {getSaleUnits} from '../../../../api-conn/products';

const ProductForm = () => {
    const location = useLocation();
    const {id} = useParams();
    const product = id ? location.state.product : {};
    const {t} = useTranslation('product-form');
    const [salesUnits, setSalesUnits] = useState([]);
    const loadProductTypes = async () => {
        const data = await getSaleUnits();
        setSalesUnits(data);
    };
    const methods = useForm({
        defaultValues: {
            name: id ? product.name : '',
            description: id ? product.description : '',
            visible: id ? product.visible : true,
            categoryId: id ? product.category.id : 0,
            salesUnitsId: id ? salesUnits.filter((unit) => unit.id === product.salesUnits.id)[0] : [],
            decimals: id ? product.decimals : [],
            file: null,
        },
    });
    useEffect(() => {
        loadProductTypes().finally();
    }, []);
    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<FormHeader />}
                contentToolbar={<div className="p-16 sm:p-24 max-w-2xl">{id ? <h1>{product.name}</h1> : <h1>{t('CREATE_NEW')}</h1>}</div>}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <FormControls imgUrl={id ? product.imageURL : ''} />
                    </div>
                }
            />
        </FormProvider>
    );
};

export default ProductForm;
