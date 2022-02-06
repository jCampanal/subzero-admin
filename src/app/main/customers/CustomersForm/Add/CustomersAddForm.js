import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./FormAddControls";
import FormHeader from "../FormHeader";
import FuseLoading from "@fuse/core/FuseLoading";
import { getAllsalesTax } from "app/api-conn/saleTaxes";
import { showMessage } from "app/store/fuse/messageSlice";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";

const CustomerForm = () => {
  const [salesTax, setsalesTax] = useState([]);
  const [loading, setLoading] = useState(false);

  const customer = {
    email: "",
    companyName: "",
    salesTaxId: "",
  };
  const { t } = useTranslation("customers-form");

  const validationRules = yup.object().shape({
    email: yup.string().email(t("NOT_EMAIL")).max(255).required(t("REQUIRED")),
    companyName: yup.string().required(t("REQUIRED")),
    salesTaxId: yup.string().required(t("REQUIRED")),
  });

  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      email: customer.email,
      companyName: customer.companyName,
      salesTaxId: customer.salesTaxId,
      callbackURL: customer.callbackURL,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  const loadSalesTax = () => {
    setLoading(true);
    getAllsalesTax()
      .then((response) => {
        setsalesTax(response.data);
        setLoading(false);
        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: t("ERRO_LOADING"),
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
        header={<FormHeader />}
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            {loading ? <FuseLoading /> : <FormControls salesTax={salesTax} />}
          </div>
        }
      />
    </FormProvider>
  );
};

export default withProtectedRoute(CustomerForm);
