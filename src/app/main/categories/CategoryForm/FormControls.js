import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {Controller, useFormContext} from 'react-hook-form';
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
    const {control, formState, watch, setValue} = methods;
    const {errors} = formState;
    const classes = useStyles(props);
    const watchName = watch('name');
    const watchLink = watch('link');

    useEffect(() => {
        setValue(
            'name',
            watchName.replace(/^[a-z]/g, (match) => match.toUpperCase())
        );
    }, [watchName, setValue]);

    useEffect(() => {
        setValue(
            'link',
            watchLink
                .replace(/[A-Z]/g, (match) => match.toLowerCase())
                .replace(/\b-\b/g, () => '_')
                .replace(/\b \b/g, () => '_')
        );
    }, [watchLink, setValue]);

    return (
        <div className="p-16 sm:p-24 max-w-2xl">
            <div className="flex flex-wrap justify-center sm:justify-start -mx-16">
                <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                        <TextField
                            id="name"
                            label={t('NAME')}
                            error={!!errors.name}
                            helperText={t(errors?.name?.message)}
                            autoFocus
                            className="mt-8 mb-16"
                            variant="outlined"
                            fullWidth
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="link"
                    control={control}
                    render={({field}) => (
                        <TextField
                            id="link"
                            label={t('LINK')}
                            error={!!errors.link}
                            helperText={t(errors?.link?.message)}
                            className="mt-8 mb-16"
                            variant="outlined"
                            fullWidth
                            {...field}
                        />
                    )}
                />

                <div className="flex flex-col sm:flex-row sm:gap-7">
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
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file"
                                    type="file"
                                    onChange={(e) => {
                                        document.getElementById('preview').src = URL.createObjectURL(e.target.files[0]);
                                        onChange(e.target.files[0]);
                                    }}
                                />
                                <Icon fontSize="large" color="action">
                                    cloud_upload
                                </Icon>
                            </label>
                        )}
                    />

                    <div>
                        <img
                            src={id ? props.imgUrl : `${process.env.PUBLIC_URL}/assets/images/ecommerce/category_image_placeholder.jpg`}
                            alt={t('CATEGORY_THUMBNAIL')}
                            id="preview"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormControls;
