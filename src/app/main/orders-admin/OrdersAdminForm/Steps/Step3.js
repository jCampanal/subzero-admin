import React, { useState, Fragment } from "react";
import { Button, TextField } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Step3 = ({ handleNext }) => {
  const { t } = useTranslation("orders-admin");

  const methods = useFormContext();
  const { control, formState, setValue, getValues } = methods;
  const { errors } = formState;

  const [showButtons, setShowButtons] = useState(true);
  // const [showForm, setShowForm] = useState(false);
  const handleClickButton = (selection) => {
    setValue("addresSelection", selection);
    if (selection === "customer") {
      handleNext();
    }
    setShowButtons(false);
  };

  return (
    <Fragment>
      {showButtons ? (
        <div>
          <div className="w-full my-24 flex justify-center">
            <Button
              className="bg-red-500 hover:bg-red-300 text-white px-16 py-10  mx-52"
              onClick={() => handleClickButton("customer")}
            >
              Use Customer Addres
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-300 text-white px-16 py-10 mx-52"
              onClick={() => handleClickButton("new")}
            >
              Use new address
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col">
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.street}
                  helperText={errors?.street?.message}
                  label={t("street")}
                  id="street"
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.city}
                  helperText={errors?.city?.message}
                  label={t("city")}
                  id="city"
                  variant="outlined"
                />
              )}
            />
          </div>

          <div className="flex flex-col">
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.state}
                  helperText={errors?.state?.message}
                  label={t("state")}
                  id="state"
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.zipCode}
                  helperText={errors?.zipCode?.message}
                  label={t("zipCode")}
                  id="zipCode"
                  variant="outlined"
                />
              )}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Step3;

Step3.propTypes = {
  handleNext: PropTypes.func.isRequired,
};
