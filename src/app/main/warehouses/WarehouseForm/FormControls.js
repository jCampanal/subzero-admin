import TextField from '@material-ui/core/TextField';
import {Controller, useFormContext} from 'react-hook-form';
import React from 'react';
import {useTranslation} from 'react-i18next';

function FormControls() {
    const {t} = useTranslation('warehouse-form');
    const methods = useFormContext();
    const {control, formState} = methods;
    const {errors} = formState;

    return (
        <div className="flex flex-col justify-center sm:justify-start flex-wrap -mx-16 px-7 sm:px-16">
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
                name="street"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.street}
                        required
                        helperText={errors?.street?.message}
                        label={t('STREET')}
                        id="street"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="city"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.city}
                        required
                        helperText={errors?.city?.message}
                        label={t('CITY')}
                        id="city"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="state"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.state}
                        required
                        helperText={errors?.state?.message}
                        label={t('STATE')}
                        id="state"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="zipCode"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.zipCode}
                        required
                        helperText={errors?.code?.message}
                        label={t('ZIP_CODE')}
                        id="zipCode"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller name="addressId" control={control} render={({field}) => <TextField {...field} hidden id="addressId" />} />
        </div>
    );
}

export default FormControls;
