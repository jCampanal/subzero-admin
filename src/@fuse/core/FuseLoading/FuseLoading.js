import React, {useState} from 'react';
import {useTimeout} from '@fuse/hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';

function FuseLoading(props) {
    const [showLoading, setShowLoading] = useState(!props.delay);
    const {t} = useTranslation(props.translationKey);

    useTimeout(() => {
        setShowLoading(true);
    }, props.delay);

    return (
        <div className={clsx('flex flex-1 flex-col items-center justify-center p-24', !showLoading && 'hidden')}>
            <Typography className="text-13 sm:text-20 mb-16" color="textSecondary">
                {props.message ? props.message : t('LOADING')}
            </Typography>
            <LinearProgress className="w-192 sm:w-320 max-w-full rounded-2" color="secondary" />
        </div>
    );
}

FuseLoading.propTypes = {
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    translationKey: PropTypes.string,
    message: PropTypes.string,
};

FuseLoading.defaultProps = {
    delay: false,
    translationKey: '',
    message: undefined,
};

export default FuseLoading;
