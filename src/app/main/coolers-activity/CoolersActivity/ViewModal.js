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
import React from "react";
import { useTranslation } from "react-i18next";

const ViewModal = ({ coolerActivity, isModal, setIsModal }) => {
  const { t } = useTranslation("coolers-activity");
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
      <DialogActions className="px-8 py-16 justify-end gap-5">
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
    </Dialog>
  );
};

export default ViewModal;
