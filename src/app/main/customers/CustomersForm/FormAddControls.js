import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { getAllsalesTax } from "app/api-conn/saleTaxes";
import { Fragment } from "react";
import FuseLoading from "@fuse/core/FuseLoading";

function FormControls() {
  const { t } = useTranslation("category-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [salesTax, setsalesTax] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadSalesTax = () => {
    setLoading(true);
    getAllsalesTax()
      .then((response) => {
        setsalesTax(response.data);
        setLoading(false);
        console.log("response.data", response.data);
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
    loadSalesTax();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <FuseLoading />
      ) : (
        <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                className="mt-8 mb-16"
                error={!!errors.email}
                required
                helperText={errors?.email?.message}
                label={t("EMAIL")}
                autoFocus
                id="email"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="companyName"
                className="mt-8 mb-16"
                error={!!errors.companyName}
                required
                helperText={errors?.companyName?.message}
                label={t("COMPANY_NAME")}
                autoFocus
                id="companyName"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Controller
            name="callbackURL"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="callbackURL"
                className="mt-8 mb-16"
                error={!!errors.callbackURL}
                required
                helperText={errors?.callbackURL?.message}
                label={t("CALLBACKURL")}
                autoFocus
                id="callbackURL"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Controller
            name="salesTaxId"
            control={control}
            render={({ field }) => (
              <FormControl className="mt-8 mb-16">
                <InputLabel
                  id="salesTaxId-select-label"
                  className="pl-20 -mt-9"
                >
                  {t("SALE_TAX")}
                </InputLabel>
                <Select
                  {...field}
                  labelId="salesTaxId-select-label"
                  id="demo-simple-select"
                  required
                  displayEmpty
                  label={t("SALE_TAX")}
                  inputProps={{ "aria-label": "Without label" }}
                  variant="outlined"
                >
                  {salesTax.map((saleTax) => {
                    return (
                      <MenuItem key={saleTax.id} value={saleTax.id}>
                        {saleTax.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          />
        </div>
      )}
    </Fragment>
  );
}

export default FormControls;
