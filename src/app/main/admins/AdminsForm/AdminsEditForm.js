import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation } from "react-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./EditFormControls";
import FormHeader from "./FormHeader";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { useTranslation } from "react-i18next";
import { phoneRegex } from "app/lib/regexs";

const AdminForm = () => {
  const { state } = useLocation();
  const { t } = useTranslation("admins-form");
  const validationRules = yup.object().shape({
    username: yup.string().required(t("REQUIRED")),
    name: yup.string().required(t("REQUIRED")),
    lastname: yup.string().required(t("REQUIRED")),
    email: yup.string().email(t("NOT_EMAIL")).max(255).required(t("REQUIRED")),
    password: yup
      .string()
      .max(255)
      .min(6)
      .required(t("REQUIRED"))
      .matches(/^(?=.*[a-z])/, t("NOT_LETTER"))
      .matches(/^(?=.*[A-Z])/, t("NOT_CHARATER"))
      .matches(/^(?=.*[0-9])/, t("NOT_PASS_NUMBER"))
      .matches(/^(?=.*[!@#$%&*_+-,./';)(><^=-?])/, t("NOT_SPECIAL_CHARATER")),
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
  const admin = state.admin;
  const methods = useForm({
    defaultValues: {
      username: admin.userName,
      name: admin.name,
      lastname: admin.lastName,
      email: admin.email,
      password: "",
      confirmPassword: "",
      phoneNumber: admin.phoneNumber,
      image: null,
    },
    resolver: yupResolver(validationRules),
    mode: "all",
  });

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<FormHeader />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            <h1>{admin.userName}</h1>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FormControls imageURL={admin.imageURL} />
          </div>
        }
      />
    </FormProvider>
  );
};

export default withProtectedRoute(AdminForm);
