import {ThemeProvider} from '@material-ui/core/styles';
import React, {memo} from 'react';
import {useSelector} from 'react-redux';
import {selectNavbarTheme} from 'app/store/fuse/settingsSlice';
import NavbarStyle1 from './navbar/style-1/NavbarStyle1';

function NavbarWrapperLayout1() {
    const navbarTheme = useSelector(selectNavbarTheme);

    return (
        <ThemeProvider theme={navbarTheme}>
            <NavbarStyle1 />
        </ThemeProvider>
    );
}

export default memo(NavbarWrapperLayout1);
