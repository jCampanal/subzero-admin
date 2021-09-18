import { useEffect, useState } from 'react';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

export default function ProductForm(props) {
  const [product, setProduct] = useState(props.product);
  const sendProduct = () => {
    props.save(product);
    props.handleClose();
  };
  useEffect(() => setProduct(props.product), [props.product]);
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {product.id === 0 ? 'Create product' : 'Edit product'}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={product.name}
          autoFocus
          margin="dense"
          id="name"
          label="Product name"
          type="text"
          fullWidth
          onChange={(e) => setProduct((prevState) => ({ ...prevState, name: e.target.value }))}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={product.category}
          label="Product category"
          onChange={(e) => setProduct((prevState) => ({ ...prevState, category: e.target.value }))}
        >
          <MenuItem value="Lorem">Lorem</MenuItem>
          <MenuItem value="Ipsum">Ipsum</MenuItem>
          <MenuItem value="Dolor">Dolor</MenuItem>
        </Select>
        <TextField
          value={product.units}
          autoFocus
          margin="dense"
          id="units"
          label="Product units"
          type="text"
          fullWidth
          onChange={(e) => setProduct((prevState) => ({ ...prevState, units: e.target.value }))}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={product.visible}
              onChange={(e) =>
                setProduct((prevState) => ({ ...prevState, visible: e.target.checked }))
              }
            />
          }
          label="Product visible"
        />
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
          {product.id === 0 ? 'Create' : 'Save'}
        </button>
      </DialogActions>
    </Dialog>
  );
}
