import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Coolers from './Coolers';

const useStyles = makeStyles({
  layoutRoot: {},
});

function CoolersPage() {
  const classes = useStyles();

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24">
          <h4>Coolers</h4>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <h4>Coolers</h4>
        </div>
      }
      content={
        <div className="p-24">
          <Coolers />
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

export default CoolersPage;
