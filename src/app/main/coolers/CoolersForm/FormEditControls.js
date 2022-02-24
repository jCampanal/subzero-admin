import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import PropTypes from "prop-types";
import { moveTo } from "app/main/coolers-activity/CoolersActivityForm/Controls";
import FuseLoading from "@fuse/core/FuseLoading";
import { getAllCustomers } from "app/api-conn/customers";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";

function FormControls({ providers }) {
  const { t } = useTranslation("coolers-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const dispatch = useDispatch();

  const [moveToState, setMoveToState] = useState("");
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const getCustomer = () => {
    setLoading(true);
    getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "There is something wrong, try to refresh the page",
            variant: "error",
          })
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>
      {loading ? (
        <FuseLoading />
      ) : (
        <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.code}
                required
                helperText={errors?.code?.message}
                label={t("CODE")}
                id="code"
                variant="outlined"
                fullWidth
              />
            )}
          />

          <Controller
            name="providerId"
            control={control}
            render={({ field }) => (
              <FormControl className="mt-8 mb-16">
                <InputLabel id="provider-select-label" className="pl-20 -mt-9">
                  {t("PROVIDER")}
                </InputLabel>
                <Select
                  {...field}
                  labelId="provider-select-label"
                  id="demo-simple-select"
                  required
                  displayEmpty
                  label={t("PROVIDER")}
                  inputProps={{ "aria-label": "Without label" }}
                  variant="outlined"
                >
                  <MenuItem>{t("PROVIDER")}</MenuItem>
                  {providers.map((provider) => (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="moveTo"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth className="mt-8 mb-16">
                <InputLabel id="moveTo-select-label" className="pl-20 -mt-9">
                  {t("MOVE_TO")}
                </InputLabel>
                <Select
                  {...field}
                  onChange={(e) => {
                    setMoveToState(e.target.value);
                    field.onChange(e);
                  }}
                  labelId="moveTo-select-label"
                  id="demo-simple-select"
                  required
                  displayEmpty
                  label={t("MOVE_TO")}
                  inputProps={{ "aria-label": "Without label" }}
                  variant="outlined"
                >
                  {moveTo.map((place, index) => {
                    return (
                      <MenuItem key={index} value={place}>
                        {place}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          />

          {moveToState === "OnClient" && (
            <Controller
              name="customerId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth className="mt-8 mb-16">
                  <InputLabel
                    id="customerId-select-label"
                    className="pl-20 -mt-9"
                  >
                    {t("CUSTOMER")}
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="customerId-select-label"
                    id="demo-simple-select"
                    required
                    displayEmpty
                    label={t("CUSTOMER")}
                    inputProps={{ "aria-label": "Without label" }}
                    variant="outlined"
                  >
                    {customers.map((customer) => {
                      return (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name} {customer.lastName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            />
          )}
        </div>
      )}
    </>
  );
}

export default FormControls;

FormControls.propTypes = {
  providers: PropTypes.array.isRequired,
};
