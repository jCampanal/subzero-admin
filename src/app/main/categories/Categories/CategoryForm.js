import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CategoryForm(props) {
  const [category, setCategory] = useState(props.category)
  const sendCategory = () => {
    props.save(category);
    props.handleClose();
  };
  useEffect(() => setCategory(props.category), [props.category]);
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <TextField
          value={category.name}
          autoFocus
          margin="dense"
          id="name"
          label="Category name"
          type="text"
          fullWidth
          onChange={e => setCategory(prevState => ({...prevState, name: e.target.value}))}
        />
        <TextField
          value={category.link}
          margin="dense"
          id="link"
          label="Category link"
          type="url"
          fullWidth
          onChange={e => setCategory(prevState => ({...prevState, link: e.target.value}))}
        />
      </DialogContent>
      <DialogActions className="pr-20 pb-12">
        <button
          onClick={props.handleClose}
          className="transition duration-350 ease-in-out shadow hover:shadow-sm bg-gray-500 hover:bg-gray-600 text-gray-50 hover:text-white rounded px-14 py-6 uppercase leading-none">
          <i className="fa fa-times-circle mr-4"/>Cancel
        </button>
        <button
          onClick={sendCategory}
          className="transition duration-350 ease-in-out shadow hover:shadow-sm bg-blue-500 hover:bg-blue-600 text-gray-50 hover:text-white rounded px-14 py-6 uppercase leading-none">
          <i className="fa fa-check-circle mr-4"/>{category.id === 0 ? "Create" : "Save"}
        </button>
      </DialogActions>
    </Dialog>
  );
}
