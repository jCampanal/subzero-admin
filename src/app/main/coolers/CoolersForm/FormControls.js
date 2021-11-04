import TextField from '@material-ui/core/TextField';
import {Controller, useFormContext} from 'react-hook-form';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import FormControl from '@material-ui/core/FormControl';
import {InputLabel, MenuItem, Select} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0,
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: 0.8,
            },
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1,
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1,
            },
        },
    },
}));

function FormControls(props) {
    const {id} = useParams();
    const {t} = useTranslation('category-form');
    const methods = useFormContext();
    const {control, formState} = methods;
    const {errors} = formState;
    const classes = useStyles(props);

    return (
        <div className="flex flex-col justify-center sm:justify-start flex-wrap -mx-16 px-7 sm:px-16">
            <Controller
                name="code"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.code}
                        required
                        helperText={errors?.code?.message}
                        label={t('CODE')}
                        autoFocus
                        id="code"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="providerId"
                control={control}
                render={({field}) => (
                    <FormControl className="mt-8 mb-16">
                        <InputLabel id="demo-simple-select-label">{t('PROVIDER')}</InputLabel>
                        <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            displayEmpty
                            label={t('PROVIDER')}
                            inputProps={{'aria-label': 'Without label'}}
                            variant="outlined"
                        >
                            <MenuItem>{t('PROVIDER')}</MenuItem>
                            {props.providers.map((provider) => (
                                <MenuItem key={provider.id} value={provider.id}>
                                    {provider.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />

            <Controller
                name="file"
                control={control}
                render={({field: {onChange}}) => (
                    <label
                        htmlFor="button-file"
                        title={t(id ? 'CLICK_TO_CHANGE' : 'CLICK_TO_LOAD')}
                        className={clsx(
                            classes.productImageUpload,
                            'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                        )}
                    >
                        <input accept="image/*" className="hidden" id="button-file" type="file" onChange={(e) => onChange(e.target.files[0])} />
                        {props.imgUrl === '' && (
                            <Icon fontSize="large" color="action">
                                cloud_upload
                            </Icon>
                        )}
                        {props.imgUrl !== '' && (
                            <div>
                                <img src={props.imgUrl} alt={t('COOLER_THUMBNAIL')} />
                            </div>
                        )}
                    </label>
                )}
            />
        </div>
    );
}

export default FormControls;
