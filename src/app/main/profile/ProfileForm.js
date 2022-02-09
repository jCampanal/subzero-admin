import FusePageCarded from "@fuse/core/FusePageCarded";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLogedUser } from "app/api-conn/User";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { phoneRegex } from "app/lib/regexs";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import FormControls from "./EditFormControls";
import FormHeader from "./FormHeader";

const ProfileForm = () => {
  const { t } = useTranslation("profile");
  const validationRules = yup.object().shape({
    username: yup.string().required(t("REQUIRED")),
    name: yup.string().required(t("REQUIRED")),
    lastname: yup.string().required(t("REQUIRED")),
    email: yup.string().email(t("NOT_EMAIL")).max(255).required(t("REQUIRED")),
    password: yup
      .string()
      .max(255)
      .test("min leng 8", t("MIN_LENGTH"), function (value) {
        return value.length === 0 ? true : value.length > 7;
      }),
    confirmPassword: yup
      .string()

      .test("passwords-match", t("MATCH_PASS"), function (value) {
        return this.parent.password === value;
      }),
    phoneNumber: yup.string().matches(phoneRegex, {
      message: t("NOT_PHONE"),
      excludeEmptyString: true,
    }),
    image: yup.mixed(),
  });

  const [user, setUser] = useState({
    id: "",
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",

    image: null,
  });
  const methods = useForm({
    defaultValues: user,
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const { reset } = methods;

  useEffect(() => {
    const fetchLogedUser = async () => {
      const { data } = await getLogedUser();

      setUser({
        ...user,
        id: data.id,
        username: data.userName,
        name: data.name,
        lastname: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        image: data.imageURL,
      });
    };
    fetchLogedUser();
  }, []);
  useEffect(() => {
    // reset form with user data
    reset(user);
  }, [user]);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "",
        }}
        header={<FormHeader user={user} />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            <h1>{user.name}</h1>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FormControls imageURL={user.image} />
          </div>
        }
      />
    </FormProvider>
  );
};

export default withProtectedRoute(ProfileForm);
