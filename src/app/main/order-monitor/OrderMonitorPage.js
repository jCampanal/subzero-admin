import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import OrderMonitor from './OrderMonitor/OrderMonitor';

const useStyles = makeStyles({
  layoutRoot: {},
});

function OrderMonitorPage() {
  const classes = useStyles();

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      contentToolbar={
        <div className="px-24">
          <h4>Order Monitor</h4>
        </div>
      }
      content={
        <div className="p-24">
          <OrderMonitor />
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

export default OrderMonitorPage;
