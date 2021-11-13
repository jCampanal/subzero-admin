import React, {useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';
import FuseLoading from '@fuse/core/FuseLoading';
import {deleteProviders, getProviders} from '../../../../api-conn/providers';
import rows from './rows';
import {openDialog} from '../../../../store/fuse/dialogSlice';
import RemoveDlg from '../../../../common/removeDlg';
import {showMessage} from '../../../../store/fuse/messageSlice';
import PageCardedHeader from '../../../products/Products/PageCardedHeader';
import ProvidersTable from './ProvidersTable';

const Providers = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        user: {logged},
    } = useSelector((state) => state);
    const {t} = useTranslation('providers');
    const [loading, setLoading] = useState(false);
    const [providers, setProviders] = useState([]);

    const loadProviders = (pageSize = 10, pageNumber = 0, code = undefined) => {
        setLoading(true);
        getProviders(pageSize, pageNumber)
            .then((response) => {
                setProviders(response.data);
                setLoading(false);
            })
            .catch(() => {
                dispatch(
                    showMessage({
                        message: 'Something went wrong. Try to reload the page',
                        variant: 'error',
                    })
                );
            });
    };
    const showProvider = (provider) => history.push(`/providers/${provider.id}`, {provider});
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
                loadProviders();
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

    useEffect(() => {
        if (!logged) history.push('/login');
    }, [logged, history]);
    useEffect(() => {
        document.title = t('PAGE_TITLE');
    }, [t]);
    useEffect(loadProviders, [dispatch]);

    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={
                <PageCardedHeader
                    iconText="business"
                    title="Providers"
                    addButtonLabel={t('ADD')}
                    addButtonCallback={() => history.push('/providers/create')}
                    searchHint="Search by name"
                    searchCallback={loadProviders}
                />
            }
            content={
                loading ? (
                    <FuseLoading />
                ) : (
                    <ProvidersTable rows={rows} providers={providers} showProvider={showProvider} editCallback={editProvider} deleteCallback={deleteProvider} />
                )
            }
            innerScroll
        />
    );
};

export default Providers;
