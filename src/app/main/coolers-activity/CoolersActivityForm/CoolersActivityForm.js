import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import FusePageCarded from "@fuse/core/FusePageCarded";
import FuseLoading from "@fuse/core/FuseLoading";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "./Header";
import Controls from "./Controls";

const validationRules = yup.object().shape({
  receiverName: yup.string().required(t("REQUIRED")),
  recierverLastName: yup.string().required(t("REQUIRED")),
  file: yup.string(),
  driverId: yup.string().required(t("REQUIRED")),
  customerId: yup.string(),
  moveTo: yup.string().required(t("REQUIRED")),
  coolerId: yup.string().required(t("REQUIRED")),
});

const CoolersActivityForm = () => {
  const history = useHistory();
  const {
    user: { logged },
  } = useSelector((state) => state);
  if (!logged) history.push("/login");

  const { t } = useTranslation("CoolersActivity-form");

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
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
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

export default CoolersActivityForm;
