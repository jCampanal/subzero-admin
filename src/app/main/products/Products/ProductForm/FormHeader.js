import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {useHistory, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {postProduct, putProduct} from '../../../../api-conn/products';
import {showMessage} from '../../../../store/fuse/messageSlice';

function ProductHeader() {
    const theme = useTheme();
    const history = useHistory();
    const {id} = useParams();
    const {t} = useTranslation('product-form');
    const methods = useFormContext();
    const {getValues} = methods;
    const dispatch = useDispatch();

    const saveData = () => {
        const formData = new FormData();
        formData.append('Name', getValues().name);
        formData.append('Description', getValues().description);
        formData.append('Visible', getValues().visible);
        formData.append('CategoryId', getValues().categoryId);
        formData.append(
            'SalesUnitsId',
            getValues().salesUnitsId.map((unit) => unit.id)
        );
        formData.append(
            'Decimals',
            getValues().decimals.map((decimal) => decimal.accept)
        );
        if (id === undefined && getValues().file !== null) formData.append('File', getValues().file);
        if (id) {
            putProduct(id, formData)
                .then(() => {
                    dispatch(
                        showMessage({
                            message: t('PRODUCT_UPDATED'),
                            variant: 'success',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                            },
                        })
                    );
                    history.push('/products');
                })
                .catch(() =>
                    dispatch(
                        showMessage({
                            message: t('PRODUCT_UPDATE_ERROR'),
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                            },
                        })
                    )
                );
        } else {
            postProduct(formData)
                .then(() => {
                    dispatch(
                        showMessage({
                            message: t('PRODUCT_CREATED'),
                            variant: 'success',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                            },
                        })
                    );
                    history.push('/products');
                })
                .catch(() =>
                    dispatch(
                        showMessage({
                            message: t('PRODUCT_CREATE_ERROR'),
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                            },
                        })
                    )
                );
        }
    };

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{x: 20, opacity: 0}} animate={{x: 0, opacity: 1, transition: {delay: 0.3}}}>
                    <Typography className="flex items-center sm:mb-12" component={Link} role="button" to="/products" color="inherit">
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">{t('PRODUCTS')}</span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{x: -20}} animate={{x: 0, transition: {delay: 0.3}}}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">{t(id ? 'EDIT' : 'CREATE')}</Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div className="flex" initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0, transition: {delay: 0.3}}}>
                {/* <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push(`/products/types/create`)}
                    startIcon={<Icon className="hidden sm:flex">add</Icon>}
                >
                    {t('DEFINE_TYPE')}
                </Button> */}
                <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0, transition: {delay: 0.2}}}>
                    <IconButton className="sm:hidden mr-5" onClick={() => history.push(`/products/sale-unit/create`)}>
                        <AddCircleIcon />
                    </IconButton>
                    <Button
                        className="whitespace-nowrap hidden sm:inline-block mr-5"
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push(`/products/sale-unit/create`)}
                    >
                        <AddCircleIcon className="mr-5" />
                        {t('ADD_SALE_UNIT')}
                    </Button>
                </motion.div>
                {id && (
                    <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0, transition: {delay: 0.2}}}>
                        <IconButton className="sm:hidden mr-5" onClick={() => history.push(`/products/${id}/remove`)}>
                            <DeleteIcon />
                        </IconButton>
                        <Button
                            className="whitespace-nowrap hidden sm:inline-block mr-5"
                            variant="contained"
                            color="secondary"
                            onClick={() => history.push(`/products/${id}/remove`)}
                        >
                            <DeleteIcon className="mr-5" />
                            {t('REMOVE')}
                        </Button>
                    </motion.div>
                )}
                <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0, transition: {delay: 0.2}}}>
                    <IconButton className="sm:hidden" onClick={() => saveData()}>
                        <SaveIcon />
                    </IconButton>
                    <Button className="whitespace-nowrap hidden sm:inline-block" variant="contained" color="secondary" onClick={() => saveData()}>
                        <SaveIcon className="mr-5" />
                        {t('SAVE')}
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default ProductHeader;
