import React, {lazy, memo, useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useHistory} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCooler, getCoolers} from '../../../api-conn/coolers';
import rows from './tableRows';
import {closeDialog, openDialog} from '../../../store/fuse/dialogSlice';
import RemoveDlg from '../../../common/removeDlg';

const Header = lazy(() => import('./PageCardedHeader').then((header) => header));
const CoolersTable = lazy(() => import('./CoolersTable').then((table) => table));

function Coolers() {
    const [coolers, setCoolers] = useState([]);
    const history = useHistory();
    const {logged} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const fetchCoolers = async () => {
        const {data} = await getCoolers();
        setCoolers(data);
    };
    const onProceed = (id) => {
        const deleteItem = async () => {
            await deleteCooler(id);
        };
        deleteItem().finally();
        dispatch(closeDialog());
        fetchCoolers().finally();
    };

    const createCooler = () => history.push('/coolers/create');
    const editCooler = (id) => history.push(`/coolers/${id}/edit`, {cooler: coolers.filter((cooler) => cooler.id === id)[0]});
    const moveCooler = (id) => history.push(`/coolers/${id}/move`, {cooler: coolers.filter((cooler) => cooler.id === id)[0]});
    const removeCooler = (itemId) =>
        dispatch(
            openDialog({
                children: (
                    <RemoveDlg
                        itemId={itemId}
                        proceedCallback={() => onProceed(itemId)}
                        dlgTitle="Warning, you have requested a risky operation"
                        dlgText="You are attempting to delete a cooler, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
                    />
                ),
            })
        );

    useEffect(() => {
        if (!logged) history.push('/login');
    }, [logged, history]);
    useEffect(() => {
        fetchCoolers().finally();
    }, []);
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header addCallback={createCooler} />}
            content={<CoolersTable coolers={coolers} rows={rows} editCallback={editCooler} deleteCallback={removeCooler} moveCallback={moveCooler} />}
            innerScroll
        />
    );
}

export default memo(Coolers);
