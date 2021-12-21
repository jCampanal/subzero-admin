import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useParams } from "react-router";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./FormAddControls";
import FormHeader from "./FormHeader";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import FuseLoading from "@fuse/core/FuseLoading";
import { getAllsalesTax } from "app/api-conn/saleTaxes";
import { showMessage } from "app/store/fuse/messageSlice";
import whithProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";

const validationRules = yup.object().shape({
  addressId: yup.string().required("REQUIRED"),
  city: yup.string().required("REQUIRED"),
  ShipmentId: yup.string().required("REQUIRED"),
  deliveryTime: yup.string().required("REQUIRED"),
  driverId: yup.string().required("REQUIRED"),
  pickUp: yup.boolean(),
  poNo: yup.string().required("REQUIRED"),
  priority: yup.number().required("REQUIRED"),
  productsDescription: yup.number().required("REQUIRED"),
  productsQuanty: yup.number().required("REQUIRED"),
  productsProductTypeId: yup.number().required("REQUIRED"),
  state: yup.string().required("REQUIRED"),
  status: yup.string().required("REQUIRED"),
  street: yup.string().required("REQUIRED"),
  tag: yup.string().required("REQUIRED"),
  termOrder: yup.string().required("REQUIRED"),
  zipCode: yup.string().required("REQUIRED"),
});

const ShipmentAddForm = () => {
  const history = useHistory();
  const [salesTax, setsalesTax] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("Shipments");
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      addressId: "",
      city: "",
      customerId: "",
      deliveryTime: "",
      driverId: "",
      pickUp: false,
      poNo: 0,
      priority: 1,
      productsDescription: "",
      productsQuanty: "",
      productsProductTypeId: "",
      state: "",
      status: "",
      street: "",
      tag: "",
      termOrder: "",
      zipCode: "",
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const removeShipment = (itemId) =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => history.push("/shipments")}
          />
        ),
      })
    );

  const loadSalesTax = () => {
    setLoading(true);
    getAllsalesTax()
      .then((response) => {
        setsalesTax(response.data);
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
    loadSalesTax();
  }, []);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<FormHeader removeCallback={removeShipment} />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            <h1>{t("CREATE_NEW")}</h1>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            {loading ? <FuseLoading /> : <FormControls salesTax={salesTax} />}
          </div>
        }
      />
    </FormProvider>
  );
};

export default memo(whithProtectedRoute(ShipmentAddForm));
