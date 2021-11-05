import React, {lazy, memo, useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import rows from './rows';
import {getWarehouses} from '../../../api-conn/warehouses';
import FuseLoading from '../../../../@fuse/core/FuseLoading';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader').then((header) => header));
const Table = lazy(() => import('./WarehousesTable').then((table) => table));

function Warehouses() {
    const {
        user: {logged},
    } = useSelector((state) => state);
    const history = useHistory();
    const {t} = useTranslation('warehouses');
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadWarehouses = async () => {
        setLoading(true);
        const {data} = await getWarehouses();
        setWarehouses(data);
        setLoading(false);
    };

    useEffect(() => {
        if (!logged) history.push('/login');
    }, [logged, history]);
    useEffect(() => {
        document.title = 'Warehouses - Subzero Ice Services';
    }, []);
    useEffect(() => {
        loadWarehouses().finally();
    }, []);

    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={
                <Header
                    iconText="store"
                    title={t('WAREHOUSES')}
                    addButtonLabel={t('ADD_WAREHOUSE')}
                    addButtonCallback={() => history.push('/warehouses/create')}
                    searchHint={t('SEARCH_BY_NAME')}
                />
            }
            content={
                loading ? (
                    <FuseLoading />
                ) : (
                    <Table warehouses={warehouses} rows={rows} editCallback={(data) => history.push(`/warehouses/${data.id}/edit`, {warehouse: data})} />
                )
            }
            innerScroll
        />
    );
}

export default memo(Warehouses);
