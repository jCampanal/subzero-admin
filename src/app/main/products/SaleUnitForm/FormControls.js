import TextField from '@material-ui/core/TextField';
import {Controller, useFormContext} from 'react-hook-form';
import React from 'react';
import {useTranslation} from 'react-i18next';

function FormControls() {
    const {t} = useTranslation('category-form');
    const methods = useFormContext();
    const {control, formState} = methods;
    const {errors} = formState;

    return (
        <div className="flex flex-col justify-center sm:justify-start flex-wrap -mx-16">
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
                        autoFocus
                        id="value"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </div>
    );
}

export default FormControls;
