import React, {lazy, memo, useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import rows from './rows';
import {deleteWarehouse, getWarehouses} from '../../../api-conn/warehouses';
import {closeDialog, openDialog} from '../../../store/fuse/dialogSlice';
import RemoveDlg from '../../../common/removeDlg';
import {showMessage} from '../../../store/fuse/messageSlice';

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
    const dispatch = useDispatch();
    const onProceed = (id) => {
        const deleteItem = async () => {
            await deleteWarehouse(id);
        };
        deleteItem().finally();
        dispatch(closeDialog());
        dispatch(
            showMessage({
                message: 'The warehouse was removed successfully',
                anchorOrigin: {vertical: 'top', horizontal: 'right'},
                variant: 'success',
            })
        );
        loadWarehouses().finally();
    };
    const remove = (itemId) =>
        dispatch(
            openDialog({
                children: (
                    <RemoveDlg
                        itemId={itemId}
                        proceedCallback={() => onProceed(itemId)}
                        dlgTitle="Warning, you have requested a risky operation"
                        dlgText="You are attempting to delete a warehouse, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
                    />
                ),
            })
        );

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
                    <Table
                        warehouses={warehouses}
                        rows={rows}
                        editCallback={(data) => history.push(`/warehouses/${data.id}/edit`, {warehouse: data})}
                        deleteCallback={remove}
                    />
                )
            }
            innerScroll
        />
    );
}

export default memo(Warehouses);
