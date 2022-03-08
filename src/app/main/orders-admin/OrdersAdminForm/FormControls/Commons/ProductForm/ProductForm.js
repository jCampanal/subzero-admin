import React, { useEffect, useState } from "react";
import { useForm, useFormContext, useFormState } from "react-hook-form";
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
import { useHistory } from "react-router";
import { postOrder } from "app/api-conn/shipments_order";
import { formatDate, getBinaryDays } from "app/lib/formatDate";
import { cancelAddOrderAdmin } from "app/store/oredersAdmin/ordersAdminSlice";

const ProductForm = (props) => {
  const [changer, setChanger] = useState(true);
  const [listCategories, setListCategories] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [salesUnits, setSalesUnits] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const { t } = useTranslation("orders-admin");
  const [submit, setSubmit] = useState(false);
  const [outofProducts, setOutofProducts] = useState(false);

  console.log("outofProducts");
  console.log(outofProducts);
  const history = useHistory();
  const dispatch = useDispatch();
  const methods = useFormContext();
  const getBigFormValues = methods.getValues;
  const setBigFormValues = methods.setValue;
  const resetBigFormValues = methods.reset;

  const validationRules = yup.object().shape({
    product: yup
      .object()
      .shape({
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
      })
      .typeError(t("SEL_VALID_PRODUCT")),
    quantity: yup
      .number()
      .required(t("REQUIRED"))
      .typeError(t("SEL_VALID_NUMBER")),
    description: yup.string(),
    saleUnit: yup
      .object()
      .shape({
        productSaleUnitId: yup.string(),
        saleUnitId: yup.string(),
        saleUnitName: yup.string(),
        productId: yup.string(),
        saleUnitValue: yup.string(),
        decimals: yup.boolean(),
      })
      .typeError(t("SEL_VALID_SAL_UNIT"))
      .required(t("REQUIRED")),
    category: yup
      .object()
      .shape({
        id: yup.string(),
        name: yup.string(),
        link: yup.string(),
        imageURL: yup.string(),
      })
      .typeError(t("SEL_VALID_CATEGORY")),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      product: "",
      category: "",
      saleUnit: "",
      description: "",
      quantity: "",
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const { dirtyFields } = useFormState({
    control,
  });

  const handleChangeProduct = (product) => {
    setSelectedProduct(product);
  };
  const handleChangeCategory = (category) => {
    reset({
      product: "",
      category: "",
      saleUnit: "",
      description: "",
      quantity: "",
    });
    setSelectedCategory(category);
    setValue("category", category);
  };

  const handleSubmitForm = (data) => {
    const oldProducts = getBigFormValues().products;

    const newProduct = {
      saleUnitName: data.saleUnit.saleUnitName,
      productName: data.product.name,
      productToSend: {
        description: data.description,
        quanty: data.quantity,
        productSaleUnitId: data.saleUnit.productSaleUnitId,
      },
    };

    setBigFormValues("products", [...oldProducts, newProduct]);
    setOutofProducts(false);
    setChanger(!changer);
    reset({
      product: "",
      category: "",
      saleUnit: "",
      description: "",
      quantity: "",
    });
    setSubmit(false);
  };
  const handleRemoveProduct = (i) => {
    const oldProducts = getBigFormValues().products;
    const newProducts = oldProducts.filter((p, pIndex) => pIndex !== i);

    setBigFormValues("products", newProducts);
    setChanger(!changer);
  };
  const saveData = () => {
    props.TryCreate();
    if (getBigFormValues().products.length === 0) {
      setOutofProducts(true);
    }
    let postURL = "/admin/Order";
    if (
      getBigFormValues().products.length !== 0 &&
      ((getBigFormValues().profile === "customer" &&
        (getBigFormValues().addressId !== "" ||
          (getBigFormValues().pickUp &&
            getBigFormValues().wrehouseId !== "")) &&
        getBigFormValues().customerId !== "Nothing selected") ||
        (getBigFormValues().profile !== "customer" &&
          getBigFormValues().companyName !== "" &&
          getBigFormValues().email !== "" &&
          getBigFormValues().wrehouseId !== ""))
    ) {
      console.log("Entra aqui");
      console.log(getBigFormValues().wrehouseId);
      const formData = {
        deliveryTime: formatDate(new Date(getBigFormValues().deliveryTime)),

        pickUp: getBigFormValues().pickUp,
        products: getBigFormValues().products.map((product) => {
          const formatedProduct = product.productToSend;

          return formatedProduct;
        }),
        // termOrder: getBigFormValues().termOrder,
        termOrder: 2,

        daysToOrder: getBinaryDays(getBigFormValues().daysToOrder),
        scheduleStatus: getBigFormValues().daysToOrder.length > 0,
        wrehouseId: getBigFormValues().wrehouseId,
      };

      if (getBigFormValues().poNo !== "") {
        const intPhoNo = getBigFormValues().poNo;
        formData.poNo = intPhoNo;
      }

      if (getBigFormValues().profile === "customer") {
        postURL = "/admin/Order";
        if (getBigFormValues().addressId !== "") {
          formData.addressId = getBigFormValues().addressId;
        }
        formData.customerId = getBigFormValues().customerId;
      } else {
        postURL = "/admin/Order/createOrderFromInvited";
        if (getBigFormValues().city !== "") {
          formData.city = getBigFormValues().city;
        }
        if (getBigFormValues().state !== "") {
          formData.state = getBigFormValues().state;
        }
        if (getBigFormValues().street !== "") {
          formData.street = getBigFormValues().street;
        }
        if (getBigFormValues().zipCode !== "") {
          formData.zipCode = parseInt(getBigFormValues().zipCode);
        }

        formData.companyName = getBigFormValues().companyName;
        formData.email = getBigFormValues().email;
      }
      postOrder(formData, postURL)
        .then(() => {
          dispatch(
            showMessage({
              message: "The order was created successfully",
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
          props.ClickClose();
          history.push("/orders_admin");
          return null;
        })
        .catch((error) =>
          dispatch(
            showMessage({
              message: error.response.data.title || error.response.data.message,
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          )
        );
    }
  };
  const handleSubmitE = () => {
    if (!isValid) {
      setSubmit(true);
    }
  };

  const handleCancel = () => {
    reset();
    setSelectedCategory("");
    setSelectedProduct("");
    resetBigFormValues();
    dispatch(cancelAddOrderAdmin(true));
    setSubmit(false);
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
  console.log(dirtyFields);
  return (
    <ProductFormS>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
            {console.log(!dirtyFields.category && submit)}
            <Field
              type="select"
              name="category"
              labelText={t("CATEGORY")}
              id="category"
              isRequired
              control={control}
              error={
                errors.category ||
                (!dirtyFields.category && (submit || outofProducts))
              }
              helperText={
                errors.category
                  ? errors.category.message
                  : !dirtyFields.category && (submit || outofProducts)
                  ? t("REQUIRED")
                  : ""
              }
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
              labelText={t("PRODUCT")}
              isRequired
              control={control}
              error={
                errors.product ||
                (!dirtyFields.product && (submit || outofProducts))
              }
              helperText={
                errors.product
                  ? errors.product.message
                  : !dirtyFields.product && (submit || outofProducts)
                  ? t("REQUIRED")
                  : ""
              }
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
                type="text"
                name="quantity"
                id="quantity"
                labelText={t("QUANTITY")}
                isRequired
                control={control}
                error={
                  errors.quantity ||
                  (!dirtyFields.quantity && (submit || outofProducts))
                }
                helperText={
                  errors.quantity
                    ? errors.quantity.message
                    : !dirtyFields.quantity && (submit || outofProducts)
                    ? t("REQUIRED")
                    : ""
                }
                style={{
                  direction: "rtl",
                }}
              />
              <Field
                type="select"
                name="saleUnit"
                id="saleUnit"
                labelText={t("UNIT")}
                isRequired
                control={control}
                error={
                  errors.saleUnit ||
                  (!dirtyFields.saleUnit && (submit || outofProducts))
                }
                helperText={
                  errors.saleUnit
                    ? errors.saleUnit.message
                    : !dirtyFields.saleUnit && (submit || outofProducts)
                    ? t("REQUIRED")
                    : ""
                }
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
              labelText={t("DESCRIPTION")}
              control={control}
            />
            <ButtonWrapperS>
              <ButtonS type="submit" onClick={handleSubmitE}>
                {t("ADD_PRODUCT")}
              </ButtonS>
            </ButtonWrapperS>
          </form>
        </div>
        <div>
          <OrderTitleS>
            <h2>{t("THE_ORDER")}</h2>
            <OrderCountS>{getBigFormValues().products.length}</OrderCountS>
          </OrderTitleS>
          {getBigFormValues().products.map((product, i) => (
            <OrderS key={i}>
              <OrderCotentS>
                <OrderNameS>{product.productName}</OrderNameS>
                <OrderDetailsS>
                  <span>
                    {product.productToSend.quanty +
                      " x " +
                      product.saleUnitName}
                  </span>
                  <IconS onClick={() => handleRemoveProduct(i)}>
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
              <ButtonS danger onClick={handleCancel}>
                {t("CANCELAR")}
              </ButtonS>
              <ButtonS primary onClick={saveData} className="flex justify-end">
                <Telegram className="mr-5" fontSize="large" />{" "}
                {t("CREATE_ORDER")}
              </ButtonS>
            </div>
          </OrderFooterS>
        </div>
      </div>
    </ProductFormS>
  );
};

export default ProductForm;
