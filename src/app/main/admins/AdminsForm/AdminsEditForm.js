import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation } from "react-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./EditFormControls";
import FormHeader from "./FormHeader";

const validationRules = yup.object().shape({
  username: yup.string().required("REQUIRED"),
  name: yup.string().required("REQUIRED"),
  lastname: yup.string().required("REQUIRED"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("REQUIRED"),
  password: yup
    .string()
    .max(255)
    .min(6)
    .required("REQUIRED")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(
      /^(?=.*[!@#$%&*_+-,./';)(><^=-?])/,
      "Must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .max(255)
    .min(6)
    .required("REQUIRED")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  phoneNumber: yup.string().required("REQUIRED"),
  image: yup.mixed(),
});

const AdminForm = () => {
  const {
    user: { logged },
  } = useSelector((state) => state);
  const history = useHistory();
  const { state } = useLocation();

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

export default AdminForm;
