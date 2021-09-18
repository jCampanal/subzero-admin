import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Admins from './Shipments/Shipments';

const useStyles = makeStyles({
  layoutRoot: {},
});

function ShipmentsPage() {
  const classes = useStyles();

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24">
          <h4>Shipments</h4>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <h4>Shipments</h4>
        </div>
      }
      content={
        <div className="p-24">
          <Admins />
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

export default ShipmentsPage;
