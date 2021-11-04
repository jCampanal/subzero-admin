import {FormProvider, useForm} from 'react-hook-form';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useHistory, useLocation, useParams} from 'react-router';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import FormControls from './FormControls';
import FormHeader from './FormHeader';
import {getProvidersAll} from '../../../api-conn/providers';
import {openDialog} from '../../../store/fuse/dialogSlice';
import RemoveDlg from '../../../common/removeDlg';

const CoolerForm = () => {
    const {
        user: {logged},
    } = useSelector((state) => state);
    const history = useHistory();
    const {id} = useParams();
    const {state} = useLocation();
    const cooler = id ? state.cooler : undefined;
    const {t} = useTranslation('coolers-form');
    const [providers, setProviders] = useState([]);
    const dispatch = useDispatch();
    const methods = useForm({
        defaultValues: {
            code: id ? cooler.code : '',
            providerId: id ? cooler.providerId : 0,
            file: null,
        },
    });
    const removeCooler = (itemId) => dispatch(openDialog({children: <RemoveDlg itemId={itemId} proceedCallback={() => history.push('/coolers')} />}));

    useEffect(() => {
        if (!logged) history.push('/login');
        return <></>;
    }, [logged, history]);
    useEffect(() => {
        const fetchAllProviders = async () => {
            const {data} = await getProvidersAll();
            setProviders(data);
        };
        fetchAllProviders().finally();
    }, []);
    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<FormHeader removeCallback={removeCooler} />}
                contentToolbar={<div className="p-16 sm:p-24 max-w-2xl">{id ? <h1>{cooler.code}</h1> : <h1>{t('CREATE_NEW')}</h1>}</div>}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <FormControls providers={providers} />
                    </div>
                }
            />
        </FormProvider>
    );
};

export default CoolerForm;
