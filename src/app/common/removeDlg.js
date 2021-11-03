import {DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import {useDispatch} from 'react-redux';
import {closeDialog} from '../store/fuse/dialogSlice';

const RemoveDlg = (props) => {
    const dispatch = useDispatch();
    return (
        <>
            <DialogTitle id="alert-dialog-title">{props.dlgTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{props.dlgText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(closeDialog())} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        props.proceedCallback();
                        dispatch(closeDialog());
                    }}
                    color="primary"
                    autoFocus
                >
                    Proceed
                </Button>
            </DialogActions>
        </>
    );
};

export default RemoveDlg;
