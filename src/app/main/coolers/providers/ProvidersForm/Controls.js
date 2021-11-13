import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import TextField from '@material-ui/core/TextField';

const Controls = () => {
    const methods = useFormContext();
    const {
        control,
        formState: {errors},
    } = methods;
    const {t} = useTranslation('providers-form');

    return (
        <div className="p-16 sm:p-24 max-w-2xl flex flex-wrap justify-center">
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
                name="tags"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.tags}
                        required
                        helperText={errors?.tags?.message}
                        label={t('TAGS')}
                        id="tags"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </div>
    );
};

export default Controls;
