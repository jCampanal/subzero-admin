import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {Controller, useFieldArray, useFormContext} from 'react-hook-form';
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import {FormControlLabel, FormGroup, InputLabel, MenuItem, Select} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import {useDispatch} from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {getCategories} from '../../../api-conn/categories';
import {getSaleUnits} from '../../../api-conn/products/sale-units';
import {showMessage} from '../../../store/fuse/messageSlice';

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
    const {t} = useTranslation('product-form');
    const methods = useFormContext();
    const {control, formState, trigger, getValues, watch, setValue} = methods;
    const watchName = watch('name');
    const {errors} = formState;
    const {
        append: appendSalesUnit,
        remove: removeSalesUnit,
        fields: fieldsSalesUnit,
    } = useFieldArray({
        control,
        name: 'salesUnitsId',
    });
    const {
        append: appendDecimals,
        update: updateDecimals,
        remove: removeDecimals,
        fields: fieldsDecimals,
    } = useFieldArray({
        control,
        name: 'decimals',
    });
    const classes = useStyles(props);
    const [categories, setCategories] = useState([]);
    const [salesUnitsId, setSalesUnitsId] = useState([]);
    const dispatch = useDispatch();
    const loadCategories = () => {
        getCategories()
            .then((response) => setCategories(response.data))
            .catch(() => dispatch(showMessage({message: 'We are facing problems to load the categories', variant: 'error'})));
    };
    const loadSaleUnits = () => {
        getSaleUnits()
            .then((response) => setSalesUnitsId(response.data))
            .catch(() => dispatch(showMessage({message: 'We are facing problems to load the sale units', variant: 'error'})));
    };

    useEffect(loadCategories, [dispatch]);
    useEffect(loadSaleUnits, [dispatch]);
    useEffect(() => {
        setValue(
            'name',
            watchName.replace(/^[a-z]/g, (match) => match.toUpperCase())
        );
    }, [watchName, setValue]);

    return (
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
                    name="description"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16"
                            error={!!errors.description}
                            required
                            helperText={errors?.description?.message}
                            label={t('DESCRIPTION')}
                            id="description"
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />

                <Controller
                    name="categoryId"
                    control={control}
                    render={({field}) => (
                        <FormControl className="mt-8 mb-16 min-w-full">
                            <InputLabel id="demo-simple-select-label" className="pl-20 -mt-9">
                                {t('CATEGORY')}
                            </InputLabel>
                            <Select
                                {...field}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                displayEmpty
                                label={t('CATEGORY')}
                                inputProps={{'aria-label': 'Without label'}}
                                variant="outlined"
                            >
                                <MenuItem>{t('CATEGORY')}</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />

                <FormControl error={!!errors.salesUnitsId} component="fieldset" variant="standard" className="mt-8 mb-16">
                    <FormGroup>
                        <FormLabel component="legend">Product units</FormLabel>
                        <div className="grid grid-cols-2 gap-y-10 mt-8 mb-16">
                            {salesUnitsId.map((unit) => {
                                const testIndex = getValues().salesUnitsId.findIndex((item) => item.id === unit.id);
                                return (
                                    <React.Fragment key={unit.id}>
                                        <FormControlLabel
                                            control={
                                                // Sales units
                                                <Checkbox
                                                    checked={testIndex !== -1}
                                                    onClick={({target: {checked}}) => {
                                                        if (checked) {
                                                            appendSalesUnit({id: unit.id});
                                                            appendDecimals({id: unit.id, accept: false});
                                                        } else {
                                                            const index = fieldsSalesUnit.findIndex((item) => item.id === unit.id);
                                                            removeSalesUnit(index);
                                                            removeDecimals(index);
                                                        }
                                                        trigger('salesUnitsId').finally();
                                                        trigger('decimals').finally();
                                                    }}
                                                />
                                            }
                                            label={unit.name}
                                        />
                                        <FormControlLabel
                                            control={
                                                // Should accept decimals?
                                                <Checkbox
                                                    checked={testIndex !== -1 ? getValues().decimals[testIndex].accept : false}
                                                    onClick={({target: {checked}}) => {
                                                        const index = fieldsDecimals.findIndex((item) => item.id === unit.id);
                                                        if (index > -1) {
                                                            updateDecimals(index, {id: unit.id, accept: checked});
                                                            trigger('decimals').finally();
                                                        }
                                                    }}
                                                />
                                            }
                                            label={t('USE_DECIMALS')}
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <FormHelperText>You must select at least one</FormHelperText>
                    </FormGroup>
                </FormControl>

                <Controller
                    name="visible"
                    control={control}
                    render={({field}) => (
                        <FormControlLabel
                            control={<Checkbox {...field} id="visible" />}
                            label={t('VISIBLE')}
                            checked={getValues().visible}
                            className="min-w-full"
                        />
                    )}
                />

                <div className="flex flex-col sm:flex-row sm:gap-7 min-w-full">
                    <Controller
                        name="file"
                        control={control}
                        render={({field: {onChange}}) => (
                            <label
                                htmlFor="button-file"
                                title={t(id ? 'CLICK_TO_CHANGE' : 'CLICK_TO_LOAD')}
                                className={clsx(
                                    classes.productImageUpload,
                                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer' +
                                        ' shadow hover:shadow-lg'
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
                            src={id ? props.imgUrl : `${process.env.PUBLIC_URL}/assets/images/ecommerce/product-image-placeholder.png`}
                            alt={t('PRODUCT_THUMBNAIL')}
                            id="preview"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormControls;
