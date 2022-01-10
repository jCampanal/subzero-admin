import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./FormEditControls";
import FormHeader from "./FormHeader";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import { getAllsalesTax } from "app/api-conn/saleTaxes";
import { showMessage } from "app/store/fuse/messageSlice";
import FuseLoading from "@fuse/core/FuseLoading";

const validationRules = yup.object().shape({
  addressId: yup.string().required(t("REQUIRED")),
  city: yup.string().required(t("REQUIRED")),
  ShipmentId: yup.string().required(t("REQUIRED")),
  deliveryTime: yup.string().required(t("REQUIRED")),
  driverId: yup.string().required(t("REQUIRED")),
  id: yup.string().required(t("REQUIRED")),
  pickUp: yup.boolean(),
  poNo: yup.string().required(t("REQUIRED")),
  priority: yup.number().required(t("REQUIRED")),
  productsPendingQuanty: yup.number().required(t("REQUIRED")),
  productCompleted: yup.number().required(t("REQUIRED")),
  productsDescription: yup.number().required(t("REQUIRED")),
  productsQuanty: yup.number().required(t("REQUIRED")),
  productsProductTypeId: yup.number().required(t("REQUIRED")),
  state: yup.string().required(t("REQUIRED")),
  status: yup.string().required(t("REQUIRED")),
  street: yup.string().required(t("REQUIRED")),
  tag: yup.string().required(t("REQUIRED")),
  termOrder: yup.string().required(t("REQUIRED")),
  zipCode: yup.string().required(t("REQUIRED")),
});

const CustomerForm = () => {
  const {
    user: { logged },
  } = useSelector((state) => state);
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation();

  const { t } = useTranslation("customers-form");
  const methods = useForm({
    defaultValues: {
      id: state.customer.id,
      street: "",
      city: "",
      state: "",
      zipCode: "",

      companyName: state.customer.company.name,
      email: state.customer.email,
      lastname: state.customer.lastName,
      name: state.customer.name,
      phoneNumber: state.customer.phoneNumber,
      priorityCustomer: true,
      username: state.customer.userName,
      salesTaxId: "",
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const dispatch = useDispatch();
  const [salesTax, setsalesTax] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const removecustomer = (itemId) =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => history.push("/customers")}
          />
        ),
      })
    );

  useEffect(() => {
    if (!logged) history.push("/login");
    return <></>;
  }, [logged, history]);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<FormHeader removeCallback={removecustomer} />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            <h1>{state.customer.name}</h1>
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

export default CustomerForm;
