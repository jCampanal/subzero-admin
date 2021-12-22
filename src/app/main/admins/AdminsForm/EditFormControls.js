import TextField from "@material-ui/core/TextField";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import Icon from "@material-ui/core/Icon";
import { useState } from "react";

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
  const { id } = useParams();
  const { t } = useTranslation("admins-form");
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const classes = useStyles(props);
  const [image, setImage] = useState(props.imageURL);

  return (
    <div className="flex flex-col justify-center sm:justify-start flex-wrap max-w-2xl">
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.username}
            helperText={errors?.username?.message}
            label={t("USERNAME")}
            id="username"
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
            error={errors.name}
            helperText={errors?.name?.message}
            label={t("NAME")}
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="lastname"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.lastname}
            helperText={errors?.lastname?.message}
            label={t("LASTNAME")}
            id="lastname"
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
            error={errors.email}
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
            error={errors.password}
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
            error={errors.confirmPassword}
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
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={errors.phoneNumber}
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
          name="image"
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
