import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

const NewCustomerGeneratorForm = (props) => {
    const {t} = useTranslation('customers');
    return (
        <div className="flex flex-col bg-gray-100 shadow-md w-full">
            <div className="m-14">
                <p className="h3">{t('ACCOUNT_GENERATOR')}</p>
                <p className="h6">{t('FILL_MESSAGE')}</p>
            </div>
            <div className="flex flex-wrap justify-start p-20 bg-white">
                <div>
                    <TextField label={t('COMPANY')} name="code" className="block" />
                    <span className="block text-xs italic mt-2 text-gray-500">{t('HINT_COMPANY_NAME')}</span>
                </div>
                <div className="sm:ml-20">
                    <TextField label={t('MAILS')} name="code" className="block" />
                    <span className="block text-xs italic mt-2 text-gray-500">{t('HINT_EMAILS')}</span>
                </div>
                <div className="min-w-full mt-12">
                    <FormControlLabel control={<Checkbox />} label={t('SEND_AFTER_KEY')} />
                </div>
            </div>
            <div className="m-20">
                <Button className="whitespace-nowrap" variant="contained" color="secondary">
                    <CheckCircleIcon className="mr-5" />
                    {t('GENERATE')}
                </Button>
                <Button className="ml-7" variant="contained" onClick={props.toggleNewCustomer}>
                    <CancelOutlinedIcon className="mr-5" />
                    {t('CANCEL')}
                </Button>
            </div>
        </div>
    );
};

export default NewCustomerGeneratorForm;

NewCustomerGeneratorForm.prototype = {
    toggleNewCustomer: PropTypes.func.isRequired,
};
