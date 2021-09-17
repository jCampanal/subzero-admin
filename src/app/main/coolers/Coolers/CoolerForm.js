import { useEffect, useState } from 'react';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';

export default function CoolerForm(props) {
  const [cooler, setCooler] = useState(props.cooler);
  const sendProduct = () => {
    props.save(cooler);
    props.handleClose();
  };
  useEffect(() => setCooler(props.cooler), [props.cooler]);
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {cooler.id === 0 ? 'Create cooler' : 'Edit cooler'}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={cooler.code}
          autoFocus
          margin="dense"
          id="name"
          label="Cooler code"
          type="text"
          fullWidth
          onChange={(e) => setCooler((prevState) => ({ ...prevState, code: e.target.value }))}
        />
        <TextField
          value={cooler.provider}
          autoFocus
          margin="dense"
          id="name"
          label="Cooler provider"
          type="text"
          fullWidth
          onChange={(e) => setCooler((prevState) => ({ ...prevState, provider: e.target.value }))}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cooler.status}
          label="Cooler status"
          className="w-full my-9"
          onChange={(e) => setCooler((prevState) => ({ ...prevState, status: e.target.value }))}
        >
          <MenuItem value="Lorem">Lorem</MenuItem>
          <MenuItem value="Ipsum">Ipsum</MenuItem>
          <MenuItem value="Dolor">Dolor</MenuItem>
        </Select>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cooler.customer}
          label="Cooler customer"
          className="w-full my-9"
          onChange={(e) => setCooler((prevState) => ({ ...prevState, customer: e.target.value }))}
        >
          <MenuItem value="Lorem">Lorem</MenuItem>
          <MenuItem value="Ipsum">Ipsum</MenuItem>
          <MenuItem value="Dolor">Dolor</MenuItem>
        </Select>
        <input
          accept="image/*"
          className="hidden"
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button color="primary" component="span">
            Upload
          </Button>
        </label>
      </DialogContent>
      <DialogActions className="pr-20 pb-12">
        <button
          type="button"
          onClick={props.handleClose}
          className="transition duration-350 ease-in-out shadow hover:shadow-sm bg-gray-500 hover:bg-gray-600 text-gray-50 hover:text-white rounded px-14 py-6 uppercase leading-none"
        >
          <i className="fa fa-times-circle mr-4" />
          Cancel
        </button>
        <button
          type="button"
          onClick={sendProduct}
          className="transition duration-350 ease-in-out shadow hover:shadow-sm bg-blue-500 hover:bg-blue-600 text-gray-50 hover:text-white rounded px-14 py-6 uppercase leading-none"
        >
          <i className="fa fa-check-circle mr-4" />
          {cooler.id === 0 ? 'Create' : 'Save'}
        </button>
      </DialogActions>
    </Dialog>
  );
}
