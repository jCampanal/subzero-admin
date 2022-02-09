import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import FuseLoading from "@fuse/core/FuseLoading";
import { useHistory, useLocation, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { showMessage } from "../../../store/fuse/messageSlice";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import {
  deleteProduct,
  postProduct,
  putProduct,
} from "../../../api-conn/products";
import FormHeader from "./FormHeader";
import FormControls from "./FormControls";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";

const ProductForm = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const { t } = useTranslation("product-form");
  const validationRules = yup.object().shape({
    name: yup
      .string()
      .required("REQUIRED")
      .min(3, "MORE_THAN_2")
      .matches(/^[a-z]([\w ]*)[a-z]$/gi, "UNACCEPTED_CHARACTER"),
    description: yup
      .string()
      .required("REQUIRED")
      .min(15, "MORE_THAN_14")
      .matches(/^[a-z]([\w ]*)[a-z]$/gi, "UNACCEPTED_CHARACTER"),
    visible: yup.bool(),
    categoryId: yup.string().required("REQUIRED"),
    salesUnitsId: yup.array().min(1),
    decimals: yup.array().min(1),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const product = id
    ? location.state.product
    : {
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
            decimals: false,
          },
        ],
      };
  const methods = useForm({
    defaultValues: {
      name: product.name,
      description: product.description,
      visible: product.visible,
      categoryId: product.category.id,
      salesUnitsId: product.id
        ? product.salesUnits.map((item) => ({ id: item.saleUnitId }))
        : [],
      decimals: product.id
        ? product.salesUnits.map((item) => ({
            id: item.saleUnitId,
            accept: item.decimals,
          }))
        : [],
      file: null,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const { getValues } = methods;

  const saveData = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("Name", getValues().name);
    formData.append("Description", getValues().description);
    formData.append("Visible", getValues().visible);
    formData.append("CategoryId", getValues().categoryId);
    getValues().salesUnitsId.map((unit) =>
      formData.append("SalesUnitsId", unit.id)
    );
    getValues().decimals.map((decimal) =>
      formData.append("Decimals", decimal.accept)
    );
    if (id === undefined && getValues().file !== null)
      formData.append("File", getValues().file);
    if (id) {
      putProduct(id, formData)
        .then(() => {
          setLoading(false);
          dispatch(
            showMessage({
              message: "Product saved!",
            })
          );
          history.push("/products");
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showMessage({
              message: "Error trying to save product. Please try again later.",
              variant: "error",
            })
          );
        });
    } else {
      postProduct(formData)
        .then(() => {
          setLoading(false);
          dispatch(
            showMessage({
              message: "Product saved!",
            })
          );
          history.push("/products");
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showMessage({
              message: "Error trying to save product. Please try again later.",
              variant: "error",
            })
          );
        });
    }
  };
  const onProceed = (itemId) => {
    setLoading(true);
    deleteProduct(JSON.stringify(itemId))
      .then(() => {
        setLoading(false);
        dispatch(
          showMessage({
            message: "Deletion completed!",
          })
        );
        history.push("/products");
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showMessage({
            message: "Error during deletion. Please try again later",
            variant: "error",
          })
        );
        history.push("/products");
      });
  };
  const removeProduct = (itemId) =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => onProceed(itemId)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a product, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );

  useEffect(() => {
    document.title = id ? t("EDITING") : t("CREATING");
  }, [id, t]);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          content: "flex mx-14 justify-center",
          toolbar: "p-0",
          header: "",
        }}
        header={
          <FormHeader saveCallback={saveData} deleteCallback={removeProduct} />
        }
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            {id ? <h1>{product.name}</h1> : <h1>{t("CREATE_NEW")}</h1>}
          </div>
        }
        content={
          loading ? <FuseLoading /> : <FormControls imgUrl={product.imageURL} />
        }
      />
    </FormProvider>
  );
};

export default withProtectedRoute(ProductForm);
