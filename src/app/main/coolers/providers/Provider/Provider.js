import React, {useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router';
import {useTranslation} from 'react-i18next';
import rows from '../../../../common/productRows';
import CoolersTable from '../../Coolers/CoolersTable';
import ProviderHeader from './ProviderHeader';
import {deleteCategory} from '../../../../api-conn/categories';
import {showMessage} from '../../../../store/fuse/messageSlice';
import {openDialog} from '../../../../store/fuse/dialogSlice';
import RemoveDlg from '../../../../common/removeDlg';
import {getProvider} from '../../../../api-conn/providers';

const Provider = () => {
    const {
        user: {logged},
    } = useSelector((state) => state);
    const history = useHistory();
    const {state} = useLocation();
    const {t} = useTranslation('provider');
    const [provider, setProvider] = useState(state.provider);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const loadProvider = () => {
        setLoading(true);
        getProvider(provider.id)
            .then((data) => {
                setProvider(data.data);
                setLoading(false);
            })
            .catch(() => {
                dispatch(
                    showMessage({
                        message: t('LOADING_FAILED'),
                        variant: 'error',
                    })
                );
                setLoading(false);
            });
    };
    const onProceed = (itemsId) => {
        setLoading(true);
        deleteCategory(JSON.stringify(itemsId))
            .then(() => {
                setLoading(false);
                dispatch(
                    showMessage({
                        message: 'Deletion completed!',
                    })
                );
                history.push('/providers');
            })
            .catch(() => {
                setLoading(false);
                dispatch(
                    showMessage({
                        message: 'Error during deletion. Please try again later',
                        variant: 'error',
                    })
                );
            });
    };
    const removeProvider = (itemId) =>
        dispatch(
            openDialog({
                children: (
                    <RemoveDlg
                        itemId={itemId}
                        proceedCallback={() => onProceed(itemId)}
                        dlgTitle="Warning, you have requested a risky operation"
                        dlgText="You are attempting to delete a provider, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
                    />
                ),
            })
        );

    useEffect(() => {
        if (!logged) history.push('/login');
    });
    useEffect(() => {
        document.title = `${provider.name} - Subzero Ice services`;
    }, [provider.name]);
    useEffect(loadProvider, [provider.id, dispatch, t]);

    return (
        <FusePageCarded
            classes={{
                toolbar: 'p-0',
                header: '',
            }}
            header={<ProviderHeader provider={provider} deleteCallback={removeProvider} />}
            contentToolbar={
                <div className="p-16 sm:p-24 max-w-2xl">
                    <h1>{provider.name}</h1>
                </div>
            }
            content={loading ? <FuseLoading /> : <CoolersTable coolers={provider.coolers} rows={rows} />}
        />
    );
};

export default Provider;
