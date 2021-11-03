import React, {useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';
import {getProviders} from '../../../api-conn/providers';

const Providers = () => {
    const history = useHistory();
    const [providers, setProviders] = useState([]);
    const {t} = useTranslation('providers');
    const {
        user: {logged},
    } = useSelector((state) => state);

    const loadProviders = async () => {
        const {data} = await getProviders();
        setProviders(data);
    };

    useEffect(() => {
        if (!logged) history.push('/login');
        return <></>;
    }, [logged, history]);
    useEffect(() => {
        document.title = t('PAGE_TITLE');
    }, [t]);
    useEffect(() => {
        loadProviders().finally();
    }, []);

    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header="Hello"
            content="Hello"
            innerScroll
        />
    );
};

export default Providers;
