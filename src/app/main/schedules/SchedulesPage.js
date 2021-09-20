import Schedules from 'app/main/schedules/Schedules/Schedules';
import FusePageSimple from '@fuse/core/FusePageSimple';
import {makeStyles} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';

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

function SchedulesPage() {
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
                            <ScheduleIcon className={classes.icon} />
                            Schedules
                        </Typography>
                    </Breadcrumbs>
                </div>
            }
            content={
                <div className="p-24">
                    <Schedules />
                </div>
            }
            leftSidebarContent={
                <div className="p-10">
                    <ul>
                        <li>
                            <a href="/categories">Categories</a>
                        </li>
                    </ul>
                </div>
            }
        />
    );
}

export default SchedulesPage;
