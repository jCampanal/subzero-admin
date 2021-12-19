import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { formatDisplayDate } from "app/lib/formatDate";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SocialDrawer = React.lazy(() =>
  import("app/components/SocialDrawer/SocialDrawer")
);

const ViewModal = ({ coolerActivity, isModal, setIsModal }) => {
  const { t } = useTranslation("coolers-activity");
  const [openShateDrawer, setOpenShateDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenShateDrawer(open);
  };
  const socialButoonInfo = {
    link: coolerActivity.imageURL,
    subject: "Prueba de en evio",
    text: `Codigo : ${coolerActivity.code}%0AConductor : ${
      coolerActivity.receiverName
    } ${
      coolerActivity.recierverLastName
    }%0AFecha de entrega : ${formatDisplayDate(
      new Date(coolerActivity.deliveredTime)
    )}`,
  };
  return (
    <Dialog
      open={isModal}
      onClose={() => setIsModal(false)}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {t("PROOF")}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: "p-0" }}>
        <div className="px-16 sm:px-24">
          <div className="-mx-4 my-5 pt-5">
            <h3>Code {coolerActivity.code}</h3>
            <br />

            <h3>
              Delivered to {coolerActivity.receiverName}{" "}
              {coolerActivity.recierverLastName}
            </h3>
            <span className="small">
              {formatDisplayDate(new Date(coolerActivity.deliveredTime))}
            </span>
          </div>
          <div className="p-5 sm:px-24 full-width mt-20">
            <img
              className="w-full"
              src={coolerActivity.imageURL}
              alt={coolerActivity.receiverName}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions className="px-8 py-16 justify-end">
        <div className="px-16">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={toggleDrawer(true)}
          >
            {t("SHARE")}
          </Button>
        </div>
        <div className="px-16">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={() => setIsModal(false)}
          >
            {t("CLOSE")}
          </Button>
        </div>
      </DialogActions>
      <SocialDrawer
        openShateDrawer={openShateDrawer}
        toggleDrawer={toggleDrawer}
        urlInfo={socialButoonInfo}
      />
    </Dialog>
  );
};

export default ViewModal;
