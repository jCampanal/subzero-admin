import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import {
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch } from "react-redux";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getCategories } from "../../../api-conn/categories";
import {
  deleteSaleUnit,
  getSaleUnits,
} from "../../../api-conn/products/sale-units";
import { showMessage } from "../../../store/fuse/messageSlice";
import { openDialog } from "../../../store/fuse/dialogSlice";
import SaleUnitForm from "../SaleUnitForm/SaleUnitForm";
import RemoveDlg from "../../../common/removeDlg";

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
  const { t } = useTranslation("product-form");
  const methods = useFormContext();
  const { control, formState, trigger, getValues, watch, setValue } = methods;
  const watchName = watch("name");
  const { errors } = formState;
  const {
    append: appendSalesUnit,
    remove: removeSalesUnit,
    fields: fieldsSalesUnit,
  } = useFieldArray({
    control,
    name: "salesUnitsId",
  });
  const {
    append: appendDecimals,
    update: updateDecimals,
    remove: removeDecimals,
    fields: fieldsDecimals,
  } = useFieldArray({
    control,
    name: "decimals",
  });
  const classes = useStyles(props);
  const [categories, setCategories] = useState([]);
  const [salesUnitsId, setSalesUnitsId] = useState([]);
  const dispatch = useDispatch();

  const loadCategories = () => {
    getCategories()
      .then((response) => setCategories(response.data.data))
      .catch(() =>
        dispatch(
          showMessage({
            message: "We are facing problems to load the categories",
            variant: "error",
          })
        )
      );
  };
  const loadSaleUnits = () => {
    getSaleUnits()
      .then((response) => setSalesUnitsId(response.data))
      .catch(() =>
        dispatch(
          showMessage({
            message: "We are facing problems to load the sale units",
            variant: "error",
          })
        )
      );
  };
  const onProceed = (itemsId) => {
    deleteSaleUnit(JSON.stringify(itemsId))
      .then(() => {
        dispatch(
          showMessage({
            message: "Sale unit deleted!",
          })
        );
        loadSaleUnits();
        setValue(
          "salesUnitsId",
          getValues().salesUnitsId.filter((item) => item.id !== itemsId[0])
        );
        setValue(
          "decimals",
          getValues().decimals.filter((item) => item.id !== itemsId[0])
        );
      })
      .catch(() => {
        dispatch(
          showMessage({
            message:
              "Error trying to delete sale unit. Please try again later.",
            variant: "error",
          })
        );
      });
  };
  const removeSaleUnit = (ids) => {
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={ids}
            proceedCallback={() => onProceed(ids)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a sale unit, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );
  };
  const riseSaleUnitForm = (saleUnit = { id: "", name: "", value: "" }) => {
    dispatch(
      openDialog({
        children: <SaleUnitForm saleUnit={saleUnit} onApply={loadSaleUnits} />,
      })
    );
  };

  useEffect(loadCategories, [dispatch]);
  useEffect(loadSaleUnits, [dispatch]);
  useEffect(() => {
    setValue(
      "name",
      watchName.replace(/^[a-z]/g, (match) => match.toUpperCase())
    );
  }, [watchName, setValue]);

  return (
    <div className="flex flex-wrap justify-center sm:justify-start max-w-2xl">
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
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.description}
            required
            helperText={errors?.description?.message}
            label={t("DESCRIPTION")}
            id="description"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => (
          <FormControl className="mt-8 mb-16 min-w-full">
            <InputLabel id="demo-simple-select-label" className="pl-20 -mt-9">
              {t("CATEGORY")}
            </InputLabel>
            <Select
              {...field}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              label={t("CATEGORY")}
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              <MenuItem>{t("CATEGORY")}</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <FormControl
        error={!!errors.salesUnitsId}
        component="fieldset"
        variant="standard"
        className="mt-8 mb-16"
      >
        <FormGroup>
          <FormLabel component="legend">Product units</FormLabel>
          <Button
            className="mt-8 mb-16"
            onClick={() => riseSaleUnitForm()}
            variant="contained"
            color="secondary"
          >
            <AddCircleIcon className="mr-5" />
            Create sale unit
          </Button>
          <div className="grid grid-cols-12 sm:grid-cols-4 gap-y-10 mt-8 mb-16">
            {salesUnitsId.map((unit) => {
              const testIndex = getValues().salesUnitsId.findIndex(
                (item) => item.id === unit.id
              );
              return (
                <React.Fragment key={unit.id}>
                  <FormControlLabel
                    className="col-span-4"
                    control={
                      // Sales units
                      <Checkbox
                        checked={testIndex !== -1}
                        onClick={({ target: { checked } }) => {
                          if (checked) {
                            appendSalesUnit({ id: unit.id });
                            appendDecimals({ id: unit.id, accept: false });
                          } else {
                            const index = fieldsSalesUnit.findIndex(
                              (item) => item.id === unit.id
                            );
                            removeSalesUnit(index);
                            removeDecimals(index);
                          }
                          trigger("salesUnitsId").finally();
                          trigger("decimals").finally();
                        }}
                      />
                    }
                    label={unit.name}
                  />
                  <FormControlLabel
                    className="col-span-3"
                    control={
                      // Should accept decimals?
                      <Checkbox
                        checked={
                          testIndex !== -1
                            ? getValues().decimals[testIndex].accept
                            : false
                        }
                        onClick={({ target: { checked } }) => {
                          const index = fieldsDecimals.findIndex(
                            (item) => item.id === unit.id
                          );
                          if (index > -1) {
                            updateDecimals(index, {
                              id: unit.id,
                              accept: checked,
                            });
                            trigger("decimals").finally();
                          }
                        }}
                      />
                    }
                    label={t("USE_DECIMALS")}
                  />
                  <IconButton
                    className="col-start-11"
                    onClick={() => riseSaleUnitForm(unit)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className="col-start-12"
                    onClick={() => removeSaleUnit([unit.id])}
                  >
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              );
            })}
          </div>
          <FormHelperText>You must select at least one</FormHelperText>
        </FormGroup>
      </FormControl>

      <div className="w-full mt-8 mb-16">
        <Controller
          name="visible"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} id="visible" />}
              label={t("VISIBLE")}
              checked={getValues().visible}
              className="min-w-full mr-0"
            />
          )}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-7 min-w-full">
        <Controller
          name="file"
          control={control}
          render={({ field: { onChange } }) => (
            <label
              htmlFor="button-file"
              title={t(id ? "CLICK_TO_CHANGE" : "CLICK_TO_LOAD")}
              className={clsx(
                classes.productImageUpload,
                "flex items-center justify-center relative w-128 h-128 rounded-16 mb-24 overflow-hidden cursor-pointer" +
                  " shadow hover:shadow-lg"
              )}
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={(e) => {
                  document.getElementById("preview").src = URL.createObjectURL(
                    e.target.files[0]
                  );
                  onChange(e.target.files[0]);
                }}
              />
              <Icon fontSize="large" color="action">
                cloud_upload
              </Icon>
            </label>
          )}
        />
        <div>
          <img
            src={
              id
                ? props.imgUrl
                : `${process.env.PUBLIC_URL}/assets/images/ecommerce/product-image-placeholder.png`
            }
            alt={t("PRODUCT_THUMBNAIL")}
            id="preview"
          />
        </div>
      </div>
    </div>
  );
}

export default FormControls;
