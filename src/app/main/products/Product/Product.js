import React, {useEffect, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
import {useHistory, useLocation} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import ProductHeader from './ProductHeader';
import {showMessage} from '../../../store/fuse/messageSlice';
import {openDialog} from '../../../store/fuse/dialogSlice';
import RemoveDlg from '../../../common/removeDlg';
import {deleteProduct} from '../../../api-conn/products';

const Product = () => {
    const {
        user: {logged},
        i18n: {language},
    } = useSelector((state) => state);
    const {
        state: {product},
    } = useLocation();
    const history = useHistory();
    const {t, i18n} = useTranslation('product');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onProceed = (itemId) => {
        setLoading(true);
        deleteProduct(JSON.stringify(itemId))
            .then(() => {
                setLoading(false);
                dispatch(
                    showMessage({
                        message: 'Deletion completed!',
                    })
                );
                history.push('/products');
            })
            .catch(() => {
                setLoading(false);
                dispatch(
                    showMessage({
                        message: 'Error during deletion. Please try again later',
                        variant: 'error',
                    })
                );
            });
    };
    const removeProduct = (itemId) =>
        dispatch(
            openDialog({
                children: (
                    <RemoveDlg
                        itemId={itemId}
                        proceedCallback={() => onProceed(itemId)}
                        dlgTitle="Warning, you have requested a risky operation"
                        dlgText="You are attempting to delete a product, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
                    />
                ),
            })
        );

    useEffect(() => {
        if (!logged) history.push('/login');
    });
    useEffect(() => {
        document.title = `${product.name} - Subzero Ice services`;
    }, [product.name]);
    useEffect(() => {
        i18n.changeLanguage(language).finally();
    }, [language]);

    if (product.id) {
        return (
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={<ProductHeader product={product} deleteCallback={removeProduct} />}
                contentToolbar={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <h1>{product.name}</h1>
                    </div>
                }
                content={
                    loading ? (
                        <FuseLoading />
                    ) : (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            <div className="mt-8 mb-16">
                                <Typography variant="subtitle1">{t('DESCRIPTION')}</Typography>
                                <Typography variant="body1">{product.description}</Typography>
                            </div>
                            <div className="mt-8 mb-16">
                                <Typography variant="subtitle1">{t('CATEGORY')}</Typography>
                                <Typography>{product.category.name}</Typography>
                            </div>
                            <div className="mt-8 mb-16">
                                <Typography variant="subtitle1">{t('VISIBILITY')}</Typography>
                                <Typography>{product.visible ? t('Visible') : t('Hidden')}</Typography>
                            </div>
                            <div className="mt-8 mb-16">
                                <Typography variant="subtitle1">{t('SALE_UNITS')}</Typography>
                                <Typography variant="body1">
                                    {product.salesUnits.map((unit) => (
                                        <span key={unit.saleUnitId}>{unit.saleUnitName}</span>
                                    ))}
                                </Typography>
                            </div>
                            <div className="mt-8 mb-16">
                                <Typography variant="subtitle1">{t('IMAGE')}</Typography>
                                <img src={product.imageURL} alt={product.name} />
                            </div>
                        </div>
                    )
                }
            />
        );
    }
    return <FuseLoading />;
};

export default Product;
