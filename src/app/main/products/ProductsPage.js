import Products from 'app/main/products/Products/Products';
import FusePageSimple from '@fuse/core/FusePageSimple';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {ShoppingCart} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    layoutRoot: {},
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

function ProductsPage() {
    const classes = useStyles();

    return (
        <FusePageSimple
            classes={{
                root: classes.layoutRoot,
            }}
            contentToolbar={
                <div className="px-24">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" href="/" className={classes.link}>
                            <HomeIcon className={classes.icon} />
                        </Link>
                        <Link color="inherit" href="/dashboard" className={classes.link}>
                            <DashboardIcon className={classes.icon} />
                            Dashboard
                        </Link>
                        <Typography color="textPrimary" className={classes.link}>
                            <ShoppingCart className={classes.icon} />
                            Products
                        </Typography>
                    </Breadcrumbs>
                </div>
            }
            content={
                <div className="p-24">
                    <Products />
                </div>
            }
        />
    );
}

export default ProductsPage;
