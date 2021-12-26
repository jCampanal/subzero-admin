import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./EditFormControls";
import FormHeader from "./FormHeader";

import { getAllUsers } from "app/api-conn/User";
import FuseLoading from "@fuse/core/FuseLoading";
import { getAllWarehouses } from "app/api-conn/warehouses";
import { showMessage } from "app/store/fuse/messageSlice";
import { useTranslation } from "react-i18next";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { phoneRegex } from "app/lib/regexs";

const today = new Date();

const CustomerForm = () => {
  const dispatch = useDispatch();

  const { state } = useLocation();

  const driver = state.driver;
  const { t } = useTranslation("drivers-form");
  const [warehouses, setWarehouses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const validationRules = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required(t("REQUIRED")),
    lastname: yup.string().required(t("REQUIRED")),
    name: yup.string().required(t("REQUIRED")),
    username: yup.string().required(t("REQUIRED")),
    phoneNumber: yup.string().matches(phoneRegex, {
      message: t("NOT_PHONE"),
      excludeEmptyString: true,
    }),
    warehouseId: yup.string().required(t("REQUIRED")),
  });

  const methods = useForm({
    defaultValues: {
      email: driver.email,
      lastname: driver.lastName,
      name: driver.name,
      phoneNumber: driver.phoneNumber,
      username: driver.userName,
      warehouseId: driver.warehouse.id,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const loadWareHouses = () => {
    getAllWarehouses()
      .then((response) => {
        setWarehouses(response.data);
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
  const loadUSers = () => {
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
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
    setLoading(true);
    loadWareHouses();
    loadUSers();
  }, []);

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
            <h1>{driver.name}</h1>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            {loading ? (
              <FuseLoading />
            ) : (
              <FormControls warehouses={warehouses} users={users} />
            )}
          </div>
        }
      />
    </FormProvider>
  );
};

export default withProtectedRoute(CustomerForm);
