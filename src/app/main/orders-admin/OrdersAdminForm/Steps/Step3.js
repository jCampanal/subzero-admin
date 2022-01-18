import React, { useState, Fragment } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Step3 = ({ handleNext }) => {
  const { t } = useTranslation("orders-admin");

  const methods = useFormContext();
  const { control, formState, setValue, getValues } = methods;
  const { errors } = formState;

  const [showButtons, setShowButtons] = useState(true);
  const [showAddresSelected, setShowAddresSelected] = useState();

  // const [showForm, setShowForm] = useState(false);
  const handleClickButton = (selection) => {
    setValue("addresSelection", selection);
    setShowAddresSelected(selection);
    setShowButtons(false);
  };
  const handleback = () => {
    setShowButtons(true);
  };

  return (
    <Fragment>
      {showButtons ? (
        <div>
          <div className="w-full text-center">Shipping address</div>
          <div className="w-full my-24 flex justify-center">
            <Button
              className="bg-blue-500 hover:bg-blue-300 text-white px-10 py-4  mx-32"
              onClick={() => handleClickButton("customer")}
            >
              Use Customer Addres
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-300 text-white px-10 py-4  mx-32"
              onClick={() => handleClickButton("new")}
            >
              Use new address
            </Button>
          </div>
        </div>
      ) : (
        <Fragment>
          {showAddresSelected === "new" ? (
            <div className="w-full">
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
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleback}>Back</Button>
              </Box>
            </div>
          ) : (
            <div className="">
              <h6 className="text-center">
                The customer addres has been seted
              </h6>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleback}>Back</Button>
              </Box>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Step3;

Step3.propTypes = {
  handleNext: PropTypes.func.isRequired,
};
