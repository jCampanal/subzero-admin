import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory } from "react-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./AddFormControls";
import FormHeader from "./FormHeader";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { phoneRegex } from "app/lib/regexs";

const adminForm = () => {
  const admin = {
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    image: null,
  };
  const { t } = useTranslation("admins-form");
  const validationRules = yup.object().shape({
    username: yup.string().required(t("REQUIRED")),
    name: yup.string().required(t("REQUIRED")),
    lastname: yup.string().required(t("REQUIRED")),
    email: yup.string().email(t("NOT_EMAIL")).max(255).required(t("REQUIRED")),
    password: yup.string().max(255).min(8).required(t("REQUIRED")),

    confirmPassword: yup
      .string()
      .max(255)
      .min(6)
      .required(t("REQUIRED"))
      .test("passwords-match", t("MATCH_PASS"), function (value) {
        return this.parent.password === value;
      }),
    phoneNumber: yup.string().matches(phoneRegex, {
      message: t("NOT_PHONE"),
      excludeEmptyString: true,
    }),
    image: yup.mixed(),
  });

  const methods = useForm({
    defaultValues: {
      username: admin.username,
      name: admin.name,
      lastname: admin.lastname,
      email: admin.email,
      password: admin.password,
      confirmPassword: admin.confirmPassword,
      phoneNumber: admin.phoneNumber,
      image: null,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "",
        }}
        header={<FormHeader />}
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FormControls />
          </div>
        }
      />
    </FormProvider>
  );
};

export default withProtectedRoute(adminForm);
