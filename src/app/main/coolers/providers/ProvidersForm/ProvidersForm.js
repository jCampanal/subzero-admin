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
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";

const ProvidersForm = () => {
  const history = useHistory();

  const { t } = useTranslation("providers-form");
  const validationRules = yup.object().shape({
    name: yup.string().required("REQUIRED"),
    tags: yup.string().required("REQUIRED"),
  });

  const { id } = useParams();
  const { state } = useLocation();
  const provider = id ? state.provider : undefined;
  const methods = useForm({
    defaultValues: {
      name: id ? provider.name : "",
      tags: id ? provider.tags : "",
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
            {id ? provider.name : t("CREATE")}
          </div>
        }
        content={loading ? <FuseLoading /> : <Controls />}
      />
    </FormProvider>
  );
};

export default withProtectedRoute(ProvidersForm);
