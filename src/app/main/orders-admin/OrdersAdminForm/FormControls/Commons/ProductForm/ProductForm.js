import React, { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import Field from "../Field/Field";
import {
  ProductFormS,
  ButtonS,
  ButtonWrapperS,
  OrderTitleS,
  OrderCountS,
  OrderS,
  OrderCotentS,
  OrderDescriptionS,
  OrderDetailsS,
  OrderNameS,
  IconS,
  OrderFooterS,
} from "./ProductForm.style";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSaleUnitsByProductsId } from "app/api-conn/products/sale-units";
import { getAllCategories } from "app/api-conn/categories";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { Divider, MenuItem } from "@material-ui/core";
import { Delete, Telegram } from "@material-ui/icons";
import { getAllProducts } from "app/api-conn/products";

const ProductForm = () => {
  const [changer, setChanger] = useState(true);
  const [listCategories, setListCategories] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [salesUnits, setSalesUnits] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const { t } = useTranslation("orders-admin");
  const dispatch = useDispatch();
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
    description: yup.string(),
    saleUnit: yup.object().shape({
      productSaleUnitId: yup.string(),
      saleUnitId: yup.string(),
      saleUnitName: yup.string(),
      productId: yup.string(),
      saleUnitValue: yup.string(),
      decimals: yup.boolean(),
    }),
    category: yup.object().shape({
      id: yup.string(),
      name: yup.string(),
      link: yup.string(),
      imageURL: yup.string(),
    }),
  });

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isValid },
    getValues,
  } = useForm({
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
      category: {
        id: "",
        name: "",
        link: "",
        imageURL: "",
      },
      saleUnit: {
        productSaleUnitId: "",
        saleUnitId: "",
        saleUnitName: "",
        productId: "",
        saleUnitValue: "",
        decimals: true,
      },
      description: "",
      quantity: 0,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const category = getValues().category;

  const handleChangeProduct = (product) => {
    setSelectedProduct(product);
  };
  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmitForm = (data) => {
    const oldProducts = getBigFormValues().products;
    if (oldProducts.findIndex((p) => p.id === data.product.id) < 0) {
      const newProduct = {
        id: data.product.id,
        saleUnitName: data.saleUnit.saleUnitName,
        productName: data.product.name,
        productToSend: {
          description: data.description,
          quanty: data.quantity,
          productSaleUnitId: data.saleUnit.productSaleUnitId,
        },
      };

      setBigFormValues("products", [...oldProducts, newProduct]);
      setChanger(!changer);
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

  useEffect(() => {
    const loadCategories = () => {
      getAllCategories()
        .then((res) => {
          setListCategories(res.data);
          return null;
        })
        .catch(() => {
          dispatch(
            showMessage({
              message: "There is something wrong, try to refresh the page",
              variant: "error",
            })
          );
        });
    };
    loadCategories();
  }, [dispatch]);

  useEffect(() => {
    const loadProducts = () => {
      getAllProducts(selectedCategory.id)
        .then((res) => {
          setListProducts(res.data);
          return null;
        })
        .catch(() => {
          dispatch(
            showMessage({
              message: "There is something wrong, try to refresh the page",
              variant: "error",
            })
          );
        });
    };
    if (selectedCategory) {
      loadProducts();
    }
  }, [selectedCategory, dispatch]);
  return (
    <ProductFormS>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
            <Field
              type="select"
              name="category"
              labelText="Category"
              id="category"
              isRequired
              control={control}
              onChange={(cate) => {
                handleChangeCategory(cate);
              }}
              options={listCategories.map((cat) => {
                return (
                  <MenuItem key={cat.id} value={cat}>
                    {cat.name}
                  </MenuItem>
                );
              })}
            />
            <Field
              type="select"
              name="product"
              id="product"
              labelText="Product"
              isRequired
              control={control}
              onChange={(product) => {
                handleChangeProduct(product);
              }}
              options={listProducts.map((pro) => {
                return (
                  <MenuItem key={pro.id} value={pro}>
                    {pro.name}
                  </MenuItem>
                );
              })}
            />
            <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
              <Field
                type="number"
                name="quantity"
                id="quantity"
                labelText="Quantity"
                isRequired
                control={control}
              />
              <Field
                type="select"
                name="saleUnit"
                id="saleUnit"
                labelText="Unit"
                isRequired
                control={control}
                options={salesUnits.map((unit) => {
                  return (
                    <MenuItem key={unit.saleUnitId} value={unit}>
                      {unit.saleUnitName}
                    </MenuItem>
                  );
                })}
              />
            </div>
            <Field
              type="text"
              name="description"
              id="description"
              labelText="Description"
              control={control}
            />
            <ButtonWrapperS>
              <ButtonS type="submit" disabled={dirtyFields === {} || !isValid}>
                Add product
              </ButtonS>
            </ButtonWrapperS>
          </form>
        </div>
        <div>
          <OrderTitleS>
            <h2>THE ORDER</h2>
            <OrderCountS>{getBigFormValues().products.length}</OrderCountS>
          </OrderTitleS>

          {getBigFormValues().products.map((product) => (
            <OrderS key={product.id}>
              <OrderCotentS>
                <OrderNameS>{product.productName}</OrderNameS>
                <OrderDetailsS>
                  <span>{product.saleUnitName}</span>
                  <IconS onClick={() => handleRemoveProduct(product)}>
                    <Delete />
                  </IconS>
                </OrderDetailsS>
              </OrderCotentS>
              <OrderDescriptionS>
                <p>{product.productToSend.description}</p>
              </OrderDescriptionS>
            </OrderS>
          ))}

          <OrderFooterS>
            <Divider className="mb-20" />
            <div className="flex justify-between">
              <ButtonS danger>Cancel</ButtonS>
              <ButtonS primary>
                <Telegram className="mr-5" /> Craete Order
              </ButtonS>
            </div>
          </OrderFooterS>
        </div>
      </div>
    </ProductFormS>
  );
};

export default ProductForm;
