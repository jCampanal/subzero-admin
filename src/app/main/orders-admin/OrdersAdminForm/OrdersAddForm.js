import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./FormAddControls";
import FormHeader from "./FormHeader";
import FuseLoading from "@fuse/core/FuseLoading";
import { showMessage } from "app/store/fuse/messageSlice";
import whithProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { getAllCustomers } from "app/api-conn/customers";
import { getAllDrivers } from "app/api-conn/drivers";
import { getAllProducts } from "app/api-conn/products";
import { intRegex, phoneRegex } from "app/lib/regexs";

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
  const [productAll, setProductAll] = useState([]);
  const [driverAll, setDrivertAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("Orders");
  const dispatch = useDispatch();
  const validationRules = yup.object().shape({
    city: yup.string(),
    customerId: yup.string().required(t("REQUIRED")),
    deliveryTime: yup.string().required(t("REQUIRED")),
    driverId: yup.string().required(t("REQUIRED")),
    pickUp: yup.boolean(),
    poNo: yup.string().matches(phoneRegex, {
      message: "not valid phone no",
      excludeEmptyString: true,
    }), // no required
    priority: yup.number().required(t("REQUIRED")),
    products: yup.array().test({
      message: "The error message if length === 1",
      test: (arr) => arr.length > 0,
    }),
    state: yup.string(),
    status: yup.string().required(t("REQUIRED")),
    street: yup.string(),
    tag: yup.string().required(t("REQUIRED")),
    termOrder: yup.string().required(t("REQUIRED")),
    zipCode: yup.string().matches(intRegex, {
      message: t("NOT_NUMBER"),
      excludeEmptyString: true,
    }),
    daysToOrder: yup.array(),
    scheduleStatus: yup.boolean(),
  });

  const methods = useForm({
    defaultValues: {
      addressId: "",
      city: "",
      customerId: "",
      deliveryTime: new Date(),
      driverId: "",
      pickUp: false,
      poNo: "",
      priority: "",
      products: [],
      state: "",
      status: "",
      street: "",
      tag: "",
      termOrder: "",
      zipCode: "",
      daysToOrder: [],
      scheduleStatus: false,
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
    const loadProducts = () => {
      setLoading(true);
      getAllProducts()
        .then((response) => {
          setProductAll(response.data);
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
    const loadDrivers = () => {
      setLoading(true);
      getAllDrivers()
        .then((response) => {
          setDrivertAll(response.data.data);
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
    loadProducts();
    loadDrivers();
  }, [dispatch]);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<FormHeader customers={customerAll} />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            <h1>{t("CREATE_NEW")}</h1>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            {loading ? (
              <FuseLoading />
            ) : (
              <FormControls
                customers={customerAll}
                drivers={driverAll}
                products={productAll}
              />
            )}
          </div>
        }
      />
    </FormProvider>
  );
};

export default memo(whithProtectedRoute(OrderAddForm));
