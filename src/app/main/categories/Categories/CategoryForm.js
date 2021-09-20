import {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function CategoryForm(props) {
    const [category, setCategory] = useState(props.category);
    const sendCategory = () => {
        props.save(category);
        props.handleClose();
    };
    useEffect(() => setCategory(props.category), [props.category]);
    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{category.id === 0 ? 'Create category' : 'Edit category'}</DialogTitle>
            <DialogContent>
                <TextField
                    value={category.name}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Category name"
                    type="text"
                    fullWidth
                    onChange={(e) => setCategory((prevState) => ({...prevState, name: e.target.value}))}
                />
                <TextField
                    value={category.link}
                    margin="dense"
                    id="link"
                    label="Category link"
                    type="url"
                    fullWidth
                    onChange={(e) => setCategory((prevState) => ({...prevState, link: e.target.value}))}
                />
            </DialogContent>
            <DialogActions className="pr-20 pb-12">
                <Button onClick={props.handleClose}>
                    <i className="fa fa-times-circle mr-4" />
                    Cancel
                </Button>
                <Button onClick={sendCategory}>
                    <i className="fa fa-check-circle mr-4" />
                    {category.id === 0 ? 'Create' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
