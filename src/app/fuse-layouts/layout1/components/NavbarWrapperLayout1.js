import {ThemeProvider} from '@material-ui/core/styles';
import {memo} from 'react';
import {useSelector} from 'react-redux';
import {selectNavbarTheme} from 'app/store/fuse/settingsSlice';
import NavbarStyle2 from './navbar/style-2/NavbarStyle2';

function NavbarWrapperLayout1() {
    const navbarTheme = useSelector(selectNavbarTheme);

    return (
        <ThemeProvider theme={navbarTheme}>
            <NavbarStyle2 />
        </ThemeProvider>
    );
}

export default memo(NavbarWrapperLayout1);
