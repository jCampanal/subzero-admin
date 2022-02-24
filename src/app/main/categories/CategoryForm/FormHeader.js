import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router';
import {useTranslation} from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import {SaveRounded} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

const ProductHeader = (props) => {
    const theme = useTheme();
    const {id} = useParams();
    const {t} = useTranslation('category-form');

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
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{x: -20}} animate={{x: 0, transition: {delay: 0.3}}}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">{t(id ? 'EDIT' : 'CREATE')}</Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div className="flex" initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0, transition: {delay: 0.3}}}>
                {id && (
                    <>
                        <IconButton className="sm:hidden" onClick={() => props.deleteCallback([id])}>
                            <DeleteIcon />
                        </IconButton>
                        <Button
                            className="whitespace-nowrap hidden sm:inline-block mr-5"
                            variant="contained"
                            color="secondary"
                            onClick={() => props.deleteCallback([id])}
                        >
                            <DeleteIcon className="mr-5" />
                            {t('REMOVE')}
                        </Button>
                    </>
                )}
                <IconButton className="sm:hidden" onClick={() => props.saveCallback()}>
                    <SaveRounded />
                </IconButton>
                <Button className="whitespace-nowrap hidden sm:inline-block" variant="contained" color="secondary" onClick={() => props.saveCallback()}>
                    <SaveIcon className="mr-5" />
                    {t('SAVE')}
                </Button>
            </motion.div>
        </div>
    );
};

export default ProductHeader;
