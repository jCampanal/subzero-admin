import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { days, MenuProps, optionsTermOrder } from "../helpData";
import { getSaleUnitsByProductsId } from "app/api-conn/products/sale-units";

const CustomController = ({
  control,
  errors,
  setOpenMulti3,
  isOpenMulti3,
  getValues,
  setValue,
}) => {
  const { t } = useTranslation("orders-admin");
  const products = getValues().products;
  const [salesUnits, setSalesUnits] = useState([]);
  useEffect(() => {
    const getSalesUnits = () => {
      const idProducts = products.map((product) => {
        return product.id;
      });

      getSaleUnitsByProductsId(idProducts)
        .then((res) => {
          setSalesUnits(res.data);
          return null;
        })
        .catch((err) => {
          console.log("Error", err);
        });
    };
    getSalesUnits();
  }, [products]);

  useEffect(() => {
    let newSalesUnits = [];
    if (products.length > 0) {
      newSalesUnits = getValues().salesUnitId.filter((saleUnit) => {
        const index = products.findIndex((p) => {
          return p.id === saleUnit.productId;
        });
        if (index >= 0) {
          return true;
        } else {
          return false;
        }
      });
    }

    setValue("salesUnitId", newSalesUnits);
  }, [products, getValues, setValue]);

  console.log("salesUnits", salesUnits);
  return (
    <Controller
      name="salesUnitId"
      control={control}
      render={({ field }) => {
        const value = field.value;
        return (
          <FormControl className="mt-8 mb-16 w-full">
            <InputLabel id="salesUnitId-select-label" className="pl-20 -mt-9">
              {t("salesUnitId")}
            </InputLabel>
            <Select
              label={t("salesUnitId")}
              style={{ width: "100%" }}
              error={!!errors.salesUnitId}
              helperText={errors?.salesUnitId?.message}
              multiple={true}
              value={value}
              onClose={(event) => {
                field.onBlur(event);
                setOpenMulti3(false);
              }}
              onOpen={() => setOpenMulti3(true)}
              open={isOpenMulti3}
              displayEmpty={true}
              MenuProps={MenuProps}
              renderValue={(selected) => {
                return selected
                  ?.map((option) => option.saleUnitName)
                  .join(", ");
              }}
              {...field}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              {salesUnits.map((salesUnit) => {
                return (
                  <MenuItem key={salesUnit.id} value={salesUnit}>
                    <Checkbox checked={value.indexOf(salesUnit) >= 0} />
                    <ListItemText
                      // primary={`${salesUnit.saleUnit.name}`}
                      primary={`${
                        products.find(
                          (product) => product.id === salesUnit.productId
                        )?.name || ""
                      } - ${salesUnit.saleUnitName}`}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};

function FormControls({ products, customers, drivers }) {
  const [isOpen, setOpen] = useState(false);
  const [isOpenMulti2, setOpenMulti2] = useState(false);
  const [isOpenMulti3, setOpenMulti3] = useState(false);

  const methods = useFormContext();
  const { control, formState, getValues, setValue } = methods;

  const { t } = useTranslation("orders-admin");

  const { errors } = formState;

  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
      <Controller
        name="customerId"
        control={control}
        render={({ field }) => {
          return (
            <FormControl className="mt-8 mb-16">
              <InputLabel id="customerId-select-label" className="pl-20 -mt-9">
                {t("CUSTOMER")}
              </InputLabel>
              <Select
                {...field}
                error={!!errors.customerId}
                helperText={errors?.customerId?.message}
                labelId="customerId-select-label"
                id="demo-simple-select"
                required
                label={t("CUSTOMER")}
                inputProps={{ "aria-label": "Without label" }}
                variant="outlined"
              >
                {customers.map((customer) => {
                  return (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        }}
      />
      <Controller
        name="driverId"
        control={control}
        render={({ field }) => {
          return (
            <FormControl className="mt-8 mb-16">
              <InputLabel id="driverId-select-label" className="pl-20 -mt-9">
                {t("DRIVER")}
              </InputLabel>
              <Select
                {...field}
                error={!!errors.driverId}
                labelId="driverId-select-label"
                id="demo-simple-select"
                required
                label={t("DRIVER")}
                inputProps={{ "aria-label": "Without label" }}
                variant="outlined"
              >
                <MenuItem value={""}>Without driver</MenuItem>
                {drivers.map((driver) => {
                  return (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        }}
      />
      <Controller
        name="products"
        control={control}
        render={({ field }) => {
          const value = field.value;
          return (
            <FormControl className="mt-8 mb-16">
              <InputLabel id="products-select-label" className="pl-20 -mt-9">
                {t("PRODUCTS")}
              </InputLabel>
              <Select
                label={t("PRODUCTS")}
                style={{ width: "100%" }}
                error={!!errors.products}
                helperText={errors?.products?.message}
                multiple={true}
                value={value}
                onClose={(event) => {
                  field.onBlur(event);
                  setOpen(false);
                }}
                onOpen={() => setOpen(true)}
                open={isOpen}
                displayEmpty={true}
                MenuProps={MenuProps}
                renderValue={(selected) => {
                  return selected?.map((option) => option.name).join(", ");
                }}
                {...field}
                inputProps={{ "aria-label": "Without label" }}
                variant="outlined"
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product}>
                    <Checkbox checked={value.indexOf(product) >= 0} />
                    <ListItemText primary={product.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CustomController
            control={control}
            errors={errors}
            setOpenMulti3={setOpenMulti3}
            isOpenMulti3={isOpenMulti3}
            getValues={getValues}
            setValue={setValue}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                className="mt-8 mb-16 w-full"
                error={!!errors.quantity}
                helperText={errors?.quantity?.message}
                label={t("quantity")}
                id="quantity"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>

      <Controller
        name="termOrder"
        control={control}
        render={({ field }) => {
          return (
            <FormControl className="mt-8 mb-16">
              <InputLabel id="termOrder-select-label" className="pl-20 -mt-9">
                {t("termOrder")}
              </InputLabel>
              <Select
                {...field}
                error={!!errors.termOrder}
                helperText={errors?.termOrder?.message}
                labelId="termOrder-select-label"
                id="demo-simple-select"
                required
                label={t("termOrder")}
                inputProps={{ "aria-label": "Without label" }}
                variant="outlined"
              >
                {optionsTermOrder.map((termOrder) => {
                  return (
                    <MenuItem key={termOrder} value={termOrder}>
                      {termOrder}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        }}
      />

      <Controller
        name="tag"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.tag}
            helperText={errors?.tag?.message}
            label={t("tag")}
            id="tag"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="deliveryTime"
          control={control}
          render={({ field }) => (
            <FormControl className="mt-8 mb-16">
              <DateTimePicker
                {...field}
                error={!!errors.deliveryTime}
                required
                helperText={errors?.deliveryTime?.message}
                label={t("DELIVERY_TIME")}
                id="deliveryTime"
                variant="outlined"
                fullWidth
              />
            </FormControl>
          )}
        />

        <Controller
          name="pickUp"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              className="mt-8 mb-16"
              id="pickUp"
              variant="outlined"
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label={t("PICKUP")}
            />
          )}
        />
      </div>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.priority}
              helperText={errors?.priority?.message}
              label={t("PRIORITY")}
              id="priority"
              variant="outlined"
            />
          )}
        />
        <Controller
          name="poNo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.poNo}
              helperText={errors?.poNo?.message}
              label={t("PHONE_NUMBER")}
              id="poNo"
              variant="outlined"
            />
          )}
        />
      </div>

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
      <Divider className="my-24" />
      <Controller
        name="daysToOrder"
        control={control}
        render={({ field }) => {
          const value = field.value;
          return (
            <FormControl className="mt-8 mb-16">
              <InputLabel id="daysToOrder-select-label" className="pl-20 -mt-9">
                {t("daysToOrder")}
              </InputLabel>
              <Select
                label={t("daysToOrder")}
                style={{ width: "100%" }}
                error={!!errors.daysToOrder}
                helperText={errors?.daysToOrder?.message}
                multiple={true}
                value={value}
                onClose={(event) => {
                  field.onBlur(event);
                  setOpenMulti2(false);
                }}
                onOpen={() => setOpenMulti2(true)}
                open={isOpenMulti2}
                displayEmpty={true}
                MenuProps={MenuProps}
                renderValue={(selected) => {
                  return selected?.map((option) => option.name).join(", ");
                }}
                {...field}
                inputProps={{ "aria-label": "Without label" }}
                variant="outlined"
              >
                {days.map((day, i) => (
                  <MenuItem key={i} value={day}>
                    <Checkbox checked={value.indexOf(day) >= 0} />
                    <ListItemText primary={day.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      />
      <Controller
        name="scheduleStatus"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            className="mt-8 mb-16"
            id="scheduleStatus"
            variant="outlined"
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={t("scheduleStatus")}
          />
        )}
      />
    </div>
  );
}

export default FormControls;

FormControls.propTypes = {
  products: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired,
  drivers: PropTypes.array.isRequired,
};
CustomController.propTypes = {
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  setOpenMulti3: PropTypes.func.isRequired,
  isOpenMulti3: PropTypes.bool.isRequired,
  drivers: PropTypes.array.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
