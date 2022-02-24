import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "&.user": {
      "& .username, & .email": {
        transition: theme.transitions.create("opacity", {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut,
        }),
      },
    },
  },
  avatar: {
    background: theme.palette.background.default,
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    "& > img": {
      borderRadius: "50%",
    },
  },
}));

function UserNavbarHeader(props) {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="primary"
      classes={{ root: classes.root }}
      className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
    >
      <div className="flex items-center justify-center absolute bottom-0 -mb-44">
        <Avatar
          className={clsx(classes.avatar, "avatar w-72 h-72 p-8 box-content")}
          alt="user photo"
          src={`${process.env.PUBLIC_URL}/assets/images/avatars/profile.jpg`}
        />
      </div>
    </AppBar>
  );
}

export default UserNavbarHeader;
