import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {closeDialog} from '../../../store/fuse/dialogSlice';
import {postSaleUnit, putSaleUnit} from '../../../api-conn/products/sale-units';
import {showMessage} from '../../../store/fuse/messageSlice';
import FuseLoading from '../../../../@fuse/core/FuseLoading';

const validationRules = yup.object().shape({
    name: yup
        .string()
        .required('REQUIRED')
        .min(3, 'MORE_THAN_2')
        .matches(/^[a-z]([\w ]*)[a-z]$/gi, 'UNACCEPTED_CHARACTER'),
    value: yup
        .string()
        .required('REQUIRED')
        .min(2, 'MORE_THAN_1')
        .matches(/^[a-z]([\w]*)[a-z]$/gi, 'UNACCEPTED_CHARACTER'),
});
const SaleUnitForm = (props) => {
    const dispatch = useDispatch();
    const {t} = useTranslation('product-form');
    const [loading, setLoading] = useState(false);
    const methods = useForm({
        defaultValues: {
            name: props.saleUnit.name,
            value: props.saleUnit.value,
        },
        mode: 'all',
        resolver: yupResolver(validationRules),
    });
    const {
        control,
        formState: {errors},
        handleSubmit,
    } = methods;
    const saveUnitForm = (data) => {
        setLoading(true);
        if (props.saleUnit.id !== '') {
            putSaleUnit(props.saleUnit.id, JSON.stringify(data))
                .then(() => {
                    setLoading(false);
                    dispatch(
                        showMessage({
                            message: 'Sale Unit saved!',
                        })
                    );
                    props.onApply();
                    dispatch(closeDialog());
                })
                .catch(() => {
                    setLoading(false);
                    dispatch(
                        showMessage({
                            message: 'Error trying to save sale unit. Please try again later.',
                            variant: 'error',
                        })
                    );
                });
        } else {
            postSaleUnit(JSON.stringify(data))
                .then(() => {
                    setLoading(false);
                    dispatch(
                        showMessage({
                            message: 'Sale Unit saved!',
                        })
                    );
                    props.onApply();
                    dispatch(closeDialog());
                })
                .catch(() => {
                    setLoading(false);
                    dispatch(
                        showMessage({
                            message: 'Error trying to save sale unit. Please try again later.',
                            variant: 'error',
                        })
                    );
                });
        }
    };

    return loading ? (
        <>
            <DialogTitle id="alert-dialog-title">{props.saleUnit.id !== '' ? 'Edit unit' : 'Create unit'}</DialogTitle>
            <DialogContent>
                <FuseLoading />
            </DialogContent>
        </>
    ) : (
        <form onSubmit={handleSubmit(saveUnitForm)}>
            <DialogTitle id="alert-dialog-title">{props.saleUnit.id !== '' ? 'Edit unit' : 'Create unit'}</DialogTitle>
            <DialogContent>
                <div className="p-16 sm:p-24 max-w-2xl">
                    <div className="flex flex-wrap justify-center sm:justify-start -mx-16">
                        <Controller
                            name="name"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.name}
                                    required
                                    helperText={errors?.name?.message}
                                    label={t('NAME')}
                                    autoFocus
                                    id="name"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                        <Controller
                            name="value"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    error={!!errors.value}
                                    required
                                    helperText={errors?.value?.message}
                                    label={t('VALUE')}
                                    id="value"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(closeDialog())} color="primary">
                    {t('CANCEL')}
                </Button>
                <Button color="primary" autoFocus type="submit">
                    {t('APPLY')}
                </Button>
            </DialogActions>
        </form>
    );
};

export default SaleUnitForm;
