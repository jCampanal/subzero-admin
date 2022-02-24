import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropType from "prop-types";
import { getAllDrivers } from "app/api-conn/drivers";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";
import { reassignOrder } from "app/api-conn/shipments_order";

const ViewModal = ({ data, isModal, setIsModal, loadOrders }) => {
  const { t } = useTranslation("schedules");
  const dispatch = useDispatch();
  const [driverAll, setDrivertAll] = useState([]);
  const [driver, setDriver] = useState("");

  const loadDrivers = () => {
    getAllDrivers()
      .then((response) => {
        setDrivertAll(response.data);

        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "There is something wrong, try to refresh the page",
            variant: "error",
          })
        );
      });
  };
  const handleChangeDriver = (e) => {
    setDriver(e.target.value);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    reassignOrder(data.id, driver)
      .then(() => {
        dispatch(
          showMessage({
            message: "The reassigment was done successfully",
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
        setIsModal(false);
        loadOrders();
        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "There is something wrong, try to refresh the page",
            variant: "error",
          })
        );
      });
  };
  useEffect(() => {
    loadDrivers();
  }, []);
  return (
    <Dialog
      open={isModal}
      onClose={() => setIsModal(false)}
      fullWidth
      maxWidth="xs"
    >
      <form onSubmit={handleSubmitForm}>
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              Transfer order #{data.no}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{ root: "p-0" }}>
          <div className="px-16 sm:px-24">
            <div className="-mx-4 my-5 pt-5">
              <h3>Please select a driver to reasign the order</h3>
              <span className="small"></span>
            </div>
            <br />

            <FormControl className="mt-8 mb-16 w-full">
              <InputLabel id="driverId-select-label" className="pl-20 -mt-9">
                {t("DRIVER")}
              </InputLabel>
              <Select
                labelId="driverId-select-label"
                id="demo-simple-select"
                required
                label={t("DRIVER")}
                inputProps={{ "aria-label": "Without label" }}
                variant="outlined"
                aria-required
                value={driver}
                onChange={handleChangeDriver}
              >
                {driverAll.map((driver) => {
                  return (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className="px-8 py-16 justify-end">
          <div className="px-16">
            <Button type="submit" variant="contained" color="secondary">
              {t("ACEPTAR")}
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ViewModal;

ViewModal.propTypes = {
  data: PropType.object.isRequired,
  isModal: PropType.bool.isRequired,
  setIsModal: PropType.func.isRequired,
  loadOrders: PropType.func.isRequired,
};
