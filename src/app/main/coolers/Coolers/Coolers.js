import React, {memo, useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import {useHistory} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCooler, getCoolers} from '../../../api-conn/coolers';
import rows from './tableRows';
import {openDialog} from '../../../store/fuse/dialogSlice';
import RemoveDlg from '../../../common/removeDlg';
import {showMessage} from '../../../store/fuse/messageSlice';
import FuseLoading from '../../../../@fuse/core/FuseLoading';
import PageCardedHeader from './PageCardedHeader';
import CoolersTable from './CoolersTable';

function Coolers() {
    const [coolers, setCoolers] = useState([]);
    const history = useHistory();
    const {
        user: {logged},
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const loadCoolers = () => {
        setLoading(true);
        getCoolers()
            .then((response) => {
                setCoolers(response.data);
                setLoading(false);
            })
            .catch(() => {
                dispatch(
                    showMessage({
                        message: 'There is something wrong, try to refresh the page',
                        variant: 'error',
                    })
                );
                setLoading(false);
            });
    };
    const onProceed = (itemIds) => {
        setLoading(true);
        deleteCooler(JSON.stringify(itemIds))
            .then(() => {
                dispatch(
                    showMessage({
                        message: 'Deletion completed!',
                    })
                );
                loadCoolers();
            })
            .catch(() => {
                dispatch(
                    showMessage({
                        message: 'Error during deletion. Please try again later',
                        variant: 'error',
                    })
                );
                setLoading(false);
            });
    };

    const createCooler = () => history.push('/coolers/create');
    const editCooler = (id) => history.push(`/coolers/${id}/edit`, {cooler: coolers.filter((cooler) => cooler.id === id)[0]});
    const removeCooler = (itemId) => {
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
    };

    useEffect(() => {
        if (!logged) history.push('/login');
    }, [logged, history]);
    useEffect(() => {
        document.title = 'Coolers - Subzero Ice Services';
    }, []);
    useEffect(loadCoolers, [dispatch]);
    return (
        <FusePageCarded
            classes={{
                content: 'flex mx-14',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<PageCardedHeader addCallback={createCooler} />}
            content={loading ? <FuseLoading /> : <CoolersTable coolers={coolers} rows={rows} editCallback={editCooler} deleteCallback={removeCooler} />}
            innerScroll
        />
    );
}

export default memo(Coolers);
