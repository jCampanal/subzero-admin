import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

import React from "react";
import { useTranslation } from "react-i18next";
import PropType from "prop-types";
import { Controller } from "react-hook-form";

const FormAddressModal = ({ data, isModal, setIsModal }) => {
  const { t } = useTranslation("schedules");

  return (
    <Dialog
      open={isModal}
      onClose={() => setIsModal(false)}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>{data ? "Edit address" : "Add address"}</DialogTitle>
      <DialogContent>
        <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col">
            <Controller
              name="street"
              // control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  // error={!!errors.street}
                  // helperText={errors?.street?.message}
                  label={t("STREET")}
                  id="street"
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="city"
              // control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  // error={!!errors.city}
                  // helperText={errors?.city?.message}
                  label={t("CITY")}
                  id="city"
                  variant="outlined"
                />
              )}
            />
          </div>

          <div className="flex flex-col">
            <Controller
              name="state"
              // control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  // error={!!errors.state}
                  // helperText={errors?.state?.message}
                  label={t("STATE")}
                  id="state"
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="zipCode"
              // control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  // error={!!errors.zipCode}
                  // helperText={errors?.zipCode?.message}
                  label={t("ZIPCODE")}
                  id="zipCode"
                  variant="outlined"
                />
              )}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions className="px-8 py-16 flex">
        <div className="px-16 ">
          <Button
            type="submit"
            color="secondary"
            onClick={() => setIsModal(false)}
          >
            {t("CLOSE")}
          </Button>
        </div>
        <div className="px-16 justify-end">
          <Button color="secondary" onClick={() => setIsModal(false)}>
            {t("Save")}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default FormAddressModal;

FormAddressModal.propTypes = {
  data: PropType.object.isRequired,
  isModal: PropType.bool.isRequired,
  setIsModal: PropType.func.isRequired,
};
