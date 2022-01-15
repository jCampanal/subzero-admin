import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  Icon,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import clsx from "clsx";
import { getAllCustomers } from "app/api-conn/customers";
import { getAllDrivers } from "app/api-conn/drivers";
import FuseLoading from "@fuse/core/FuseLoading";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";

const useStyles = makeStyles((theme) => ({
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#ad8741",
    opacity: 0,
  },
  productImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  productImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& $productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover $productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

const moveTo = ["OnSubzero", "OutSubzero", "OnClient"];

const Controls = () => {
  const methods = useFormContext();
  const classes = useStyles();
  const {
    control,
    getValues,
    formState: { errors },
  } = methods;
  const { t } = useTranslation("providers-form");
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moveToState, setMoveToState] = useState("");
  const [imageSrc, setImageSrc] = useState("");
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
  const getDrivers = () => {
    setLoading(true);
    getAllDrivers()
      .then((response) => {
        setDrivers(response.data.data);
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
    getDrivers();
    getCustomer();
  }, []);

  return (
    <>
      {loading ? (
        <FuseLoading />
      ) : (
        <div className="flex flex-wrap p-16 sm:p-24 min-w-full content-start">
          <Controller
            name="coolerID"
            control={control}
            render={({ field }) => (
              <input {...field} type="hidden" name="coolerId" />
            )}
          />

          <div className="min-w-full mt-8 mb-16">
            <Controller
              name="moveTo"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="moveTo-select-label" className="pl-20 -mt-9">
                    {t("MOVE_TO")}
                  </InputLabel>
                  <Select
                    {...field}
                    onChange={(e) => {
                      setMoveToState(e.target.value), field.onChange(e);
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
          </div>
          {moveToState === "OnClient" && (
            <div className="min-w-full mt-8 mb-16">
              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
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
            </div>
          )}

          <div className="min-w-full mt-8 mb-16">
            <Controller
              name="driverId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel
                    id="driverId-select-label"
                    className="pl-20 -mt-9"
                  >
                    {t("DRIVER")}
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="driverId-select-label"
                    id="demo-simple-select"
                    required
                    displayEmpty
                    label={t("DRIVER")}
                    inputProps={{ "aria-label": "Without label" }}
                    variant="outlined"
                  >
                    {drivers.map((driver) => {
                      return (
                        <MenuItem key={driver.id} value={driver.id}>
                          {driver.name} {driver.lastName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            />
          </div>

          <div className="w-full mt-8 mb-16">
            <Controller
              name="recierverLastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.recierverLastName}
                  required
                  helperText={errors?.recierverLastName?.message}
                  label={t("RECIEVEER_LASTNAME")}
                  id="recierverLastName"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
          <div className="w-full mt-8 mb-16">
            <Controller
              name="receiverName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.receiverName}
                  required
                  helperText={errors?.receiverName?.message}
                  label={t("REEICER_NAME")}
                  id="receiverName"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
          {moveToState === "OnClient" && (
            <div className="flex flex-col sm:flex-row sm:gap-7">
              <Controller
                name="file"
                control={control}
                render={({ field: { onChange } }) => (
                  <label
                    htmlFor="button-file"
                    title={t(/* id ? "CLICK_TO_CHANGE" :  */ "CLICK_TO_LOAD")}
                    className={clsx(
                      classes.productImageUpload,
                      "flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                    )}
                  >
                    <input
                      accept="image/*"
                      className="hidden"
                      id="button-file"
                      type="file"
                      onChange={(e) => {
                        setImageSrc(URL.createObjectURL(e.target.files[0]));
                        onChange(e.target.files[0]);
                      }}
                    />
                    <Icon fontSize="large" color="action">
                      cloud_upload
                    </Icon>
                  </label>
                )}
              />

              {imageSrc !== "" && (
                <div>
                  <img
                    src={imageSrc}
                    alt={t("CATEGORY_THUMBNAIL")}
                    id="preview"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Controls;
