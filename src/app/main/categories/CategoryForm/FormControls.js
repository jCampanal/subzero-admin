import TextField from '@material-ui/core/TextField';
import {Controller, useFormContext} from 'react-hook-form';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';

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
        <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
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
                name="link"
                control={control}
                render={({field}) => <TextField {...field} className="mt-8 mb-16" id="link" label={t('LINK')} type="text" variant="outlined" fullWidth />}
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
                                <img src={props.imgUrl} alt={t('CATEGORY_THUMBNAIL')} />
                            </div>
                        )}
                    </label>
                )}
            />
        </div>
    );
}

export default FormControls;
