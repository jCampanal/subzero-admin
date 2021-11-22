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
        <div className="flex flex-wrap p-16 sm:p-24 min-w-full content-start">
            <div className="min-w-full mt-8 mb-16">
                <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
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
            </div>

            <div className="w-full mt-8 mb-16">
                <Controller
                    name="tags"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
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
        </div>
    );
};

export default Controls;
