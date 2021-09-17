import {
  DialogContentText,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from '@material-ui/core';

export default function ConfirmDlg(props) {
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Warning</DialogTitle>
      <DialogContent>
        <DialogContentText className="text-base">
          Are you sure you want to delete this cooler {props.subject.name}? This action can not be
          undone... at least by now.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="px-14">
        <Button onClick={props.handleClose} autofocus className="uppercase" color="secondary">
          <i className="fa fa-times-circle mr-4" />
          Cancel
        </Button>
        <Button
          onClick={() => props.confirm(props.subject.id)}
          className="uppercase"
          color="primary"
        >
          <i className="fa fa-check-circle mr-4" />
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
