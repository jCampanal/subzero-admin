import {DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteCooler} from '../api-conn/coolers';
import {closeDialog} from '../store/fuse/dialogSlice';

const RemoveDlg = (props) => {
    const dispatch = useDispatch();
    const onProceed = () => {
        const deleteItem = async () => {
            await deleteCooler(props.itemId);
        };
        deleteItem().finally();
        dispatch(closeDialog());
        props.proceedCallback();
    };
    return (
        <>
            <DialogTitle id="alert-dialog-title">Use Google's location service?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(closeDialog())} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => onProceed()} color="primary" autoFocus>
                    Proceed
                </Button>
            </DialogActions>
        </>
    );
};

export default RemoveDlg;
