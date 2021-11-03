import React, {lazy, useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';
import FuseLoading from '@fuse/core/FuseLoading';
import {deleteProviders, getProviders} from '../../../api-conn/providers';
import tableRows from './tableRows';
import {openDialog} from '../../../store/fuse/dialogSlice';
import RemoveDlg from '../../../common/removeDlg';
import {showMessage} from '../../../store/fuse/messageSlice';

const Providers = () => {
    const history = useHistory();
    const {
        user: {logged},
    } = useSelector((state) => state);
    if (!logged) history.push('/login');

    const {t} = useTranslation('providers');
    useEffect(() => {
        document.title = t('PAGE_TITLE');
    }, [t]);
    const [loading, setLoading] = useState(false);
    const [providers, setProviders] = useState([]);

    const loadProviders = async () => {
        setLoading(true);
        const {data} = await getProviders();
        setProviders(data);
        setLoading(false);
    };
    useEffect(() => {
        loadProviders().finally();
    }, []);

    const showProvider = (provider) => history.push(`/providers/${provider.id}`, {provider});

    const dispatch = useDispatch();
    const onProceed = (id) => {
        setLoading(true);
        deleteProviders(id)
            .then(() => {
                dispatch(
                    showMessage({
                        message: t('DELETE_SUCCESSFUL'),
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    })
                );
                setLoading(false);
                loadProviders().finally();
            })
            .catch(() => {
                setLoading(false);
                dispatch(
                    showMessage({
                        message: t('DELETE_ERROR'),
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    })
                );
            });
    };

    const editProvider = (provider) => history.push(`/providers/${provider.id}/edit`, {provider});
    const deleteProvider = (provider) =>
        dispatch(
            openDialog({
                children: (
                    <RemoveDlg itemId={provider.id} proceedCallback={() => onProceed(provider.id)} dlgTitle={t('WARNING_TITLE')} dlgText={t('WARNING_TEXT')} />
                ),
            })
        );

    const ProvidersTable = lazy(() => import('./ProvidersTable').then((table) => table));
    const ProvidersHeader = lazy(() => import('../../products/Products/PageCardedHeader').then((header) => header));

    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={
                <ProvidersHeader
                    iconText="business"
                    title="Providers"
                    addButtonLabel={t('ADD')}
                    addButtonCallback={() => history.push('/providers/create')}
                    searchHint=""
                />
            }
            content={
                loading ? (
                    <FuseLoading />
                ) : (
                    <ProvidersTable
                        rows={tableRows}
                        providers={providers}
                        showProvider={showProvider}
                        editCallback={editProvider}
                        deleteCallback={deleteProvider}
                    />
                )
            }
            innerScroll
        />
    );
};

export default Providers;
