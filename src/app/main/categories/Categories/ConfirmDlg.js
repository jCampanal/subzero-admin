import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DialogContentText} from "@material-ui/core";

export default function ConfirmDlg(props) {
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Warning</DialogTitle>
      <DialogContent>
        <div className="grid grid-rows-2 gap-7">
          <div className="fex items-center">
            <i className="fa fa-7x fa-exclamation-triangle mr-8 text-orange-900 text-5x1"/>
          </div>
          <div>
            <DialogContentText className="text-24">
              Are you sure you want to delete category {props.subject.name}. This action can not be undone... at least by now.
            </DialogContentText>
          </div>
          <div className="self-center col-span-2">
            <div className="flex justify-center mb-7">
              <button
                onClick={props.handleClose}
                className="transition duration-350 ease-in-out shadow hover:shadow-sm bg-gray-500 hover:bg-gray-600 text-gray-50 hover:text-white px-16 py-8 uppercase leading-none text-lg mr-4">
                <i className="fa fa-times-circle mr-4"/>Cancel
              </button>
              <button
                onClick={() => props.confirm(props.subject.id)}
                className="transition duration-350 ease-in-out shadow hover:shadow-sm bg-blue-500 hover:bg-blue-600 text-gray-50 hover:text-white px-16 py-8 uppercase leading-none text-lg">
                <i className="fa fa-check-circle mr-4"/>Confirm
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
