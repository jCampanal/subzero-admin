import { FormProvider, useForm } from "react-hook-form";
import React, { lazy, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { showMessage } from "app/store/fuse/messageSlice";
import whithProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { getAllCustomers } from "app/api-conn/customers";
import { getAllWarehouses } from "app/api-conn/warehouses";
import FuseLoading from "@fuse/core/FuseLoading";
const FormControls = lazy(() => import("./FormControls/FormControls"));
// const fakeCustomer = [
//   {
//     company: {
//       id: "67b6e540-0985-4a-3af8278f6e2e",
//       name: "Company 1",
//     },
//     email: "test@admin.com",
//     id: "5646567b6e540-0985-49e2-8a7a-3af8278f6e2e",
//     imageURL: "url",
//     lastName: "Pérez",
//     name: "Juan",
//     phoneNumber: "test@admin.com",
//     priorityCustomer: false,
//     userName: "Juan",
//   },
//   {
//     company: {
//       id: "6asdsad7bwer6ee540-0985-49e2-8a7a-3af8278f6were2e",
//       name: "Company 2",
//     },
//     email: "test@admin.com",
//     id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
//     imageURL: "url",
//     lastName: "Pérez",
//     name: "Ramos",
//     phoneNumber: "test@admin.com",
//     priorityCustomer: false,
//     userName: "Ramos",
//   },
// ];

const OrderAddForm = () => {
  const [customerAll, setCustomerAll] = useState([]);
  const [warehoseAll, setWarehoseAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("Orders");
  const dispatch = useDispatch();
  const validationRules = yup.object().shape({
    deliveryTime: yup.string().required(t("REQUIRED")),
    pickUp: yup.boolean(),
    poNo: yup.string(),
    products: yup.array().required(),
    priority: yup.number().required(t("REQUIRED")),
    daysToOrder: yup.array(),
  });

  const methods = useForm({
    defaultValues: {
      addressId: "",
      customerId: "",

      deliveryTime: new Date(),
      pickUp: false,
      poNo: "",
      products: [],
      daysToOrder: [],

      city: "",
      state: "",
      street: "",
      zipCode: "",
      wrehouseId: "",
      companyName: "",
      email: "",

      profile: "customer",
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  useEffect(() => {
    const loadCustomers = () => {
      setLoading(true);
      getAllCustomers()
        .then((res) => {
          setCustomerAll(res.data);
          setLoading(false);
          return null;
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
    const loaWarehouses = () => {
      setLoading(true);
      getAllWarehouses()
        .then((response) => {
          setWarehoseAll(response.data);
          setLoading(false);
          return null;
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

    loadCustomers();
    loaWarehouses();
  }, [dispatch]);

  return (
    <FormProvider {...methods}>
      {loading ? (
        <FuseLoading />
      ) : (
        <FormControls customers={customerAll} warehouses={warehoseAll} />
      )}
    </FormProvider>
  );
};

export default memo(whithProtectedRoute(OrderAddForm));
