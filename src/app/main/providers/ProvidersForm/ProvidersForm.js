import React, {lazy, useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {useHistory, useLocation, useParams} from 'react-router';
import {useSelector} from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';

const ProvidersForm = () => {
    const history = useHistory();
    const {
        user: {logged},
    } = useSelector((state) => state);
    if (!logged) history.push('/login');
    const {id} = useParams();
    const {state} = useLocation();
    const provider = id ? state.provider : undefined;
    const methods = useForm({
        defaultValues: {
            name: id ? provider.name : '',
            tags: id ? provider.tags : '',
        },
    });
    const [loading, setLoading] = useState(false);
    const toggleLoading = () => {
        setLoading(!loading);
    };
    const Header = lazy(() => import('./Header').then((header) => header));
    const Controls = lazy(() => import('./Controls').then((controls) => controls));
    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<Header toggleLoading={toggleLoading} />}
                contentToolbar="This is a toolbar"
                content={loading ? <FuseLoading /> : <Controls />}
            />
        </FormProvider>
    );
};

export default ProvidersForm;
