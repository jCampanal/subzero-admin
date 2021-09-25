import React from 'react';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import {ThemeProvider} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {motion} from 'framer-motion';
import {useSelector} from 'react-redux';
import {selectMainTheme} from 'app/store/fuse/settingsSlice';

function PageCardedHeader() {
    const mainTheme = useSelector(selectMainTheme);

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-center">
                <Icon component={motion.span} initial={{scale: 0}} animate={{scale: 1, transition: {delay: 0.2}}} className="text-24 md:text-32">
                    schedule
                </Icon>
                <Typography
                    component={motion.span}
                    initial={{x: -20}}
                    animate={{x: 0, transition: {delay: 0.2}}}
                    delay={300}
                    className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
                >
                    Schedules
                </Typography>
            </div>

            <div className="flex flex-1 items-center justify-center px-12 gap-5 sm:gap-9 lg:gap-16">
                <ThemeProvider theme={mainTheme}>
                    <Paper
                        component={motion.div}
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1, transition: {delay: 0.2}}}
                        className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
                    >
                        <Icon color="action">search</Icon>

                        <Input
                            placeholder="Search by customer"
                            className="flex flex-1 mx-8"
                            disableUnderline
                            fullWidth
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                        />
                    </Paper>
                    <Paper
                        component={motion.div}
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1, transition: {delay: 0.2}}}
                        className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
                    >
                        <Icon color="action">search</Icon>

                        <Input
                            placeholder="Search by company"
                            className="flex flex-1 mx-8"
                            disableUnderline
                            fullWidth
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                        />
                    </Paper>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default PageCardedHeader;
