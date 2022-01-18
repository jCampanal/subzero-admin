import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { getSaleUnitsByProductsId } from "app/api-conn/products/sale-units";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Step1 = ({ products }) => {
  const { t } = useTranslation("orders-admin");
  const [changer, setChanger] = useState(true);

  const methods = useFormContext();
  const getBigFormValues = methods.getValues;
  const setBigFormValues = methods.setValue;

  const validationRules = yup.object().shape({
    product: yup.object().shape({
      id: yup.string(),
      name: yup.string(),
      description: yup.string(),
      visible: yup.boolean(),
      imageURL: yup.string(),
      category: yup.object().shape({
        id: yup.string(),
        name: yup.string(),
        link: yup.string(),
        imageURL: yup.string(),
      }),
      salesUnits: yup.array(),
      listID: yup.string().nullable(),
    }),
    quantity: yup.number().required(t("REQUIRED")),
    saleUnit: yup.object().shape({
      productSaleUnitId: yup.string(),
      saleUnitId: yup.string(),
      saleUnitName: yup.string(),
      productId: yup.string(),
      saleUnitValue: yup.string(),
      decimals: yup.boolean(),
    }),
  });

  const { handleSubmit, control, formState, getValues } = useForm({
    defaultValues: {
      product: {
        id: "",
        name: "",
        description: "",
        visible: false,
        imageURL: "",
        category: {
          id: "",
          name: "",
          link: "",
          imageURL: "",
        },
        salesUnits: [
          {
            saleUnitId: "",
            saleUnitName: "",
            saleUnitValue: "",
            decimals: true,
          },
        ],
        listID: "",
      },
      saleUnit: {
        productSaleUnitId: "",
        saleUnitId: "",
        saleUnitName: "",
        productId: "",
        saleUnitValue: "",
        decimals: true,
      },
      quantity: 0,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const { errors } = formState;

  const [salesUnits, setSalesUnits] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const handleChangeProduct = (product) => {
    setSelectedProduct(product);
  };
  useEffect(() => {
    const getSalesUnits = () => {
      const idArr = [];
      idArr.push(selectedProduct.id);

      getSaleUnitsByProductsId(idArr)
        .then((res) => {
          setSalesUnits(res.data);
          return null;
        })
        .catch((err) => {
          console.log("Error", err);
        });
    };

    if (selectedProduct) {
      getSalesUnits();
    }
  }, [selectedProduct]);

  useEffect(() => {}, [changer]);

  const handleSubmitForm = (data) => {
    const oldProducts = getBigFormValues().products;
    if (oldProducts.findIndex((p) => p.id === data.product.id) < 0) {
      const newProduct = {
        id: data.product.id,
        saleUnitName: data.saleUnit.saleUnitName,
        productToSend: {
          description: data.product.description,
          quanty: data.quantity,
          productSaleUnitId: data.saleUnit.productSaleUnitId,
        },
      };
      console.log("data", data);
      console.log("oldProducts", oldProducts);
      setBigFormValues("products", [...oldProducts, newProduct]);
    } else {
      alert("You can not add the same product twice");
    }
  };
  const handleRemoveProduct = (product) => {
    const oldProducts = getBigFormValues().products;
    const newProducts = oldProducts.filter((p) => p.id !== product.id);

    setBigFormValues("products", newProducts);
    setChanger(!changer);
  };

  console.log("products", products);
  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit((data) => handleSubmitForm(data))}
        className="mb-80"
      >
        <Controller
          name="product"
          control={control}
          render={({ field }) => {
            return (
              <FormControl className="mt-8 mb-16 w-full">
                <InputLabel id="product-select-label" className="pl-20 -mt-9">
                  {t("product")}
                </InputLabel>
                <Select
                  {...field}
                  error={!!errors.product}
                  helperText={errors?.product?.message}
                  labelId="product-select-label"
                  id="demo-simple-select"
                  required
                  label={t("product")}
                  inputProps={{ "aria-label": "Without label" }}
                  variant="outlined"
                  onChange={(e) => {
                    handleChangeProduct(e.target.value);
                    field.onChange(e);
                  }}
                >
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product}>
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
            <Controller
              name="saleUnit"
              control={control}
              render={({ field }) => {
                return (
                  <FormControl className="mt-8 mb-16 w-full">
                    <InputLabel
                      id="saleUnit-select-label"
                      className="pl-20 -mt-9"
                    >
                      {t("saleUnit")}
                    </InputLabel>
                    <Select
                      {...field}
                      error={!!errors.saleUnit}
                      helperText={errors?.saleUnit?.message}
                      labelId="saleUnit-select-label"
                      id="demo-simple-select"
                      required
                      label={t("saleUnit")}
                      inputProps={{ "aria-label": "Without label" }}
                      variant="outlined"
                    >
                      {salesUnits.map((salesUnit) => {
                        return (
                          <MenuItem key={salesUnit.id} value={salesUnit}>
                            <ListItemText
                              // primary={`${salesUnit.saleUnit.name}`}
                              primary={`${salesUnit.saleUnitName}`}
                            />
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                );
              }}
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

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-red-400 text-white hover:bg-red-200"
          >
            Add product
          </Button>
        </div>
      </form>

      <div className="flex w-full flex-col">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">SalesUnit</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Option</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getBigFormValues().products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.productToSend.description}
                  </TableCell>
                  <TableCell align="right">{product.saleUnitName}</TableCell>
                  <TableCell align="right">
                    {product.productToSend.quanty}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleRemoveProduct(product)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {getBigFormValues().products.map((product) => {
          return (
            <div className="flex justify-between" key={product.id}>
              <span className="max-w-128">
                {product.productToSend.description}
              </span>
              <span>{product.saleUnitName}</span>
              <span>{product.productToSend.quanty}</span>
            </div>
          );
        })} */}
      </div>
    </React.Fragment>
  );
};

export default Step1;

Step1.propTypes = {
  products: PropTypes.array.isRequired,
};
