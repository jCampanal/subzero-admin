import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {Redirect, useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import {postCategory} from '../../../../api-conn/categories';
// import _ from '@lodash';

function ProductHeader() {
    const theme = useTheme();
    const {id} = useParams();
    const {t} = useTranslation('category-form');
    const methods = useFormContext();
    const {getValues} = methods;
    const [saved, setSaved] = useState(false);

    if (saved) return <Redirect to="/categories" />;
    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{x: 20, opacity: 0}} animate={{x: 0, opacity: 1, transition: {delay: 0.3}}}>
                    <Typography className="flex items-center sm:mb-12" component={Link} role="button" to="/categories" color="inherit">
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">Products</span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    <motion.div className="hidden sm:flex" initial={{scale: 0}} animate={{scale: 1, transition: {delay: 0.3}}}>
                        {/* {<img className="w-32 sm:w-48 rounded" src={} alt={} />} */}
                    </motion.div>
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{x: -20}} animate={{x: 0, transition: {delay: 0.3}}}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">{t(id ? 'EDIT' : 'CREATE')}</Typography>
                            <Typography variant="caption" className="font-medium">
                                {t('DETAIL')}
                            </Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div className="flex" initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0, transition: {delay: 0.3}}}>
                {/* <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                >
                    Remove
                </Button> */}
                <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        const formData = new FormData();
                        formData.append('Name', getValues().name);
                        formData.append('Link', `https://subzeroiceservices.com/category/${getValues().link}`);
                        formData.append('File', getValues().file);
                        postCategory(formData)
                            .then(() => setSaved(true))
                            .catch((error) => console.log(error));
                    }}
                    // disabled={_.isEmpty(dirtyFields) || !isValid}
                    // onClick={handleSaveProduct}
                >
                    Save
                </Button>
            </motion.div>
        </div>
    );
}

export default ProductHeader;
