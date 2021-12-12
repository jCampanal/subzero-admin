import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { useState } from "react";
import { useEffect } from "react";
import { getAllWarehouses } from "app/api-conn/warehouses";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";

const useStyles = makeStyles((theme) => ({
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
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

function FormControls(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation("category-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const classes = useStyles(props);
  const [image, setImage] = useState(props.imageURL);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadWareHouses = () => {
    setLoading(true);
    getAllWarehouses()
      .then((response) => {
        setWarehouses(response.data);
        setLoading(false);
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
    loadWareHouses();
  }, []);

  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
      <Controller
        name="userName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.userName}
            required
            helperText={errors?.userName?.message}
            label={t("USERNAME")}
            id="userName"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label={t("NAME")}
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.lastName}
            required
            helperText={errors?.lastName?.message}
            label={t("LASTNAME")}
            id="lastName"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.email}
            required
            type="email"
            helperText={errors?.email?.message}
            label={t("email")}
            id="email"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.password}
            required
            type="password"
            helperText={errors?.password?.message}
            label={t("PASSWORD")}
            id="password"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.confirmPassword}
            required
            type="password"
            helperText={errors?.confirmPassword?.message}
            label={t("CONFIRMPASSWORD")}
            id="confirmPassword"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="warehouseId"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16">
            <InputLabel id="warehouseId-select-label" className="pl-20 -mt-9">
              {t("WAREHOUSEID")}
            </InputLabel>
            <Select
              {...field}
              labelId="warehouseId-select-label"
              id="demo-simple-select"
              required
              displayEmpty
              label={t("WAREHOUSEID")}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              {warehouses.map((wareHouse) => {
                return (
                  <MenuItem key={wareHouse.id} value={wareHouse.id}>
                    {wareHouse.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.phoneNumber}
            required
            helperText={errors?.phoneNumber?.message}
            label={t("PHONENUMBER")}
            id="phoneNumber"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <div className="flex flex-col sm:flex-row sm:gap-7">
        <Controller
          name="file"
          control={control}
          render={({ field: { onChange } }) => (
            <label
              htmlFor="button-file"
              title={t(id ? "CLICK_TO_CHANGE" : "CLICK_TO_LOAD")}
              className={clsx(
                classes.productImageUpload,
                "flex items-center justify-center relative w-128 h-128 rounded-16 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
              )}
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={(e) => {
                  setImage(URL.createObjectURL(e.target.files[0]));

                  onChange(e.target.files[0]);
                }}
              />
              <Icon fontSize="large" color="action">
                cloud_upload
              </Icon>
            </label>
          )}
        />
        {image && (
          <div>
            <img src={image} alt={t("COOLER_THUMBNAIL")} id="preview" />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormControls;
