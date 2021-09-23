import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const NewCustomerGeneratorForm = (props) => {
    return (
        <div className="flex flex-col bg-gray-100 shadow-md w-full">
            <div className="m-14">
                <p className="h3">Account generator</p>
                <p className="h6">Fill the follow to generate a link for a new customer</p>
            </div>
            <div className="flex flex-wrap justify-start p-20 bg-white">
                <div>
                    <TextField label="Company" name="code" className="block" />
                    <span className="block text-xs italic mt-2 text-gray-500">Ej.: Company name</span>
                </div>
                <div className="sm:ml-20">
                    <TextField label="Mails" name="code" className="block" />
                    <span className="block text-xs italic mt-2 text-gray-500">Ej.: user@server.com, user2@server.com,...</span>
                </div>
                <div className="min-w-full mt-12">
                    <FormControlLabel control={<Checkbox />} label="Send after generate the key" />
                </div>
            </div>
            <div className="m-20">
                <Button className="whitespace-nowrap" variant="contained" color="secondary">
                    <CheckCircleIcon className="mr-5" />
                    Generate
                </Button>
                <Button className="ml-7" variant="contained" onClick={props.toggleNewCustomer}>
                    <CancelOutlinedIcon className="mr-5" />
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default NewCustomerGeneratorForm;

NewCustomerGeneratorForm.prototype = {
    toggleNewCustomer: PropTypes.func.isRequired,
};
