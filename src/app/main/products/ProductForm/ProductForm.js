import React, {lazy, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useHistory, useLocation, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const Header = lazy(() => import('./FormHeader').then((header) => header));
const FormControls = lazy(() => import('./FormControls').then((form) => form));

const ProductForm = () => {
    const logged = useSelector((state) => state.user.logged);
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();
    const product = id ? location.state.product : {};
    const {t} = useTranslation('product-form');
    const methods = useForm({
        defaultValues: {
            name: id ? product.name : '',
            description: id ? product.description : '',
            visible: id ? product.visible : true,
            categoryId: id ? product.category.id : '',
            salesUnitsId: id ? product.salesUnits.map((item) => ({id: item.saleUnitId})) : [],
            decimals: id ? product.salesUnits.map((item) => ({id: item.saleUnitId, accept: item.decimals})) : [],
            file: null,
        },
    });

    useEffect(() => {
        if (!logged) history.push('/login');
    }, [logged, history]);
    useEffect(() => {
        document.title = id ? t('EDITING') : t('CREATING');
    }, [id, t]);

    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<Header />}
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
