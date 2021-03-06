import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useLocation } from "react-router";
import FusePageCarded from "@fuse/core/FusePageCarded";
import FuseLoading from "@fuse/core/FuseLoading";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "./Header";
import Controls from "./Controls";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";

const CoolersActivityForm = () => {
  const { t } = useTranslation("CoolersActivity-form");
  const validationRules = yup.object().shape({
    receiverName: yup.string().required(t("REQUIRED")),
    recierverLastName: yup.string().required(t("REQUIRED")),
    file: yup.string(),
    driverId: yup.string().required(t("REQUIRED")),
    customerId: yup.string(),
    moveTo: yup.string().required(t("REQUIRED")),
    coolerId: yup.string().required(t("REQUIRED")),
  });

  const { state } = useLocation();

  const cooler = state.cooler;

  const methods = useForm({
    defaultValues: {
      receiverName: "",
      recierverLastName: "",
      file: "",
      driverId: "",
      customerId: "",
      moveTo: "",
      coolerId: cooler?.id,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  const [loading, setLoading] = useState(false);
  const toggleLoading = () => {
    setLoading(!loading);
  };

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          content: "flex justify-center",
          toolbar: "p-0",
          header: "",
        }}
        header={<Header toggleLoading={toggleLoading} />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            {cooler.name ? cooler.name : t("MOVE_COOLER")}
          </div>
        }
        content={loading ? <FuseLoading /> : <Controls />}
      />
    </FormProvider>
  );
};

export default withProtectedRoute(CoolersActivityForm);
