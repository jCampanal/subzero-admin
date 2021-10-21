import React from 'react';
import Icon from '@material-ui/core/Icon';
import {useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const DeleteHeader = (props) => {
    const theme = useTheme();
    const {name, imageURL, products} = props.category;
    const {t} = useTranslation('category');
    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{x: 20, opacity: 0}} animate={{x: 0, opacity: 1, transition: {delay: 0.3}}}>
                    <Typography className="flex items-center sm:mb-12" component={Link} role="button" to="/categories" color="inherit">
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">{t('CATEGORIES')}</span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    <motion.div className="hidden sm:flex" initial={{scale: 0}} animate={{scale: 1, transition: {delay: 0.3}}}>
                        <img className="w-32 sm:w-48 rounded" src={imageURL} alt={name} />
                    </motion.div>
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{x: -20}} animate={{x: 0, transition: {delay: 0.3}}}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">{name}</Typography>
                            <Typography variant="caption" className="font-medium">
                                {products.length} products
                            </Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteHeader;
