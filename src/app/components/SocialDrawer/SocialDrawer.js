import { Email, Telegram, WhatsApp } from "@material-ui/icons";
import React from "react";
import CustomDrawer from "../Drawer/CustomDrawer";
import SocialButton from "../SocialButton/SocialButton";

const SocialDrawer = ({ openShateDrawer, toggleDrawer, urlInfo }) => {
  console.log(toggleDrawer);
  return (
    <CustomDrawer
      open={openShateDrawer}
      toggleDrawer={toggleDrawer}
      anchor={"bottom"}
    >
      <div className="p-16 flex justify-center items-center">
        <SocialButton
          icon={<WhatsApp fontSize="40px" />}
          backColor={"#25D366"}
          link={`https://wa.me/?text=${urlInfo.link}%0A${urlInfo.subject}%0A${urlInfo.text}`}
        />
        <SocialButton
          icon={<Telegram fontSize="40px" />}
          backColor={"#0088cc"}
          link={`https://t.me/share/url?url=${urlInfo.link}&text=${urlInfo.subject}%0A${urlInfo.text}`}
        />
        <SocialButton
          icon={<Email fontSize="40px" />}
          backColor={"#7d7d7d"}
          link={`mailto:?subject=${urlInfo.subject}&body=${urlInfo.link}%0A${urlInfo.text}`}
        />
      </div>
    </CustomDrawer>
  );
};

export default SocialDrawer;
