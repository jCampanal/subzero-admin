import React from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {useTheme} from '@material-ui/core/styles';

function PageCardedHeader() {
    const {t} = useTranslation('coolers-customers');
    const theme = useTheme();
    return (
        <div className="flex flex-col w-full sm:py-16">
            <div className="flex items-center">
                <motion.div initial={{x: 20, opacity: 0}} animate={{x: 0, opacity: 1, transition: {delay: 0.3}}}>
                    <Typography className="flex items-center sm:mb-12" component={Link} role="button" to="/coolers" color="inherit">
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">{t('COOLERS')}</span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{x: -20}} animate={{x: 0, transition: {delay: 0.3}}}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">{t('COOLERS_CUSTOMERS')}</Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageCardedHeader;
