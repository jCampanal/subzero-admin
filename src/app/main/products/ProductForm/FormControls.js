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
import {getCategories} from '../../../api-conn/categories';
import {getSaleUnits} from '../../../api-conn/products/sale-units';

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
    const {control, formState, trigger, getValues} = methods;
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
    const loadCategories = async () => {
        const data = await getCategories(30, 1);
        setCategories(data.data);
    };
    const loadSaleUnits = async () => {
        const data = await getSaleUnits();
        setSalesUnitsId(data);
    };

    useEffect(() => {
        loadCategories().finally();
        loadSaleUnits().finally();
    }, [id]);

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
                    <FormControl className="mt-8 mb-16">
                        <InputLabel id="demo-simple-select-label">{t('CATEGORY')}</InputLabel>
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

            {salesUnitsId.map((unit) => {
                const testIndex = getValues().salesUnitsId.findIndex((item) => item.id === unit.id);
                return (
                    <div key={unit.id} className="grid grid-cols-2 self-start mt-8 mb-16">
                        <FormControlLabel
                            control={
                                // Sales units
                                <Checkbox
                                    defaultChecked={testIndex !== -1}
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
                                    defaultChecked={testIndex !== -1 ? getValues().decimals[testIndex].accept : false}
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
                    </div>
                );
            })}

            <Controller
                name="visible"
                control={control}
                render={({field}) => (
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox {...field} className="mt-8 mb-16" id="visible" />}
                            label={t('VISIBLE')}
                            checked={getValues().visible}
                        />
                    </FormGroup>
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
                            'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer' +
                                ' shadow hover:shadow-lg'
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
