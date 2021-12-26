import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./FormEditControls";
import FormHeader from "./FormHeader";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import { getAllsalesTax } from "app/api-conn/saleTaxes";
import { showMessage } from "app/store/fuse/messageSlice";
import FuseLoading from "@fuse/core/FuseLoading";
import { intRegex, phoneRegex } from "app/lib/regexs";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";

const CustomerForm = () => {
  const history = useHistory();
  const { state } = useLocation();

  const { t } = useTranslation("customers-form");
  const validationRules = yup.object().shape({
    street: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zipCode: yup.string().matches(intRegex, {
      message: t("NOT_NUMBER"),
      excludeEmptyString: true,
    }),
    companyName: yup.string(),
    email: yup.string().email(t("NOT_EMAIL")).max(255).required(t("REQUIRED")),
    lastname: yup.string().required(t("REQUIRED")),
    name: yup.string().required(t("REQUIRED")),
    phoneNumber: yup.string().matches(phoneRegex, {
      message: t("NOT_PHONE"),
      excludeEmptyString: true,
    }),
    priorityCustomer: yup.boolean(),
    salesTaxId: yup.string(),
    username: yup.string().required(t("REQUIRED")),
  });

  const methods = useForm({
    defaultValues: {
      id: state.customer.id,
      street: state.customer.company.address.street,
      city: state.customer.company.address.city,
      state: state.customer.company.address.state,
      zipCode: state.customer.company.address.zipCode,
      companyName: state.customer.company.name,
      email: state.customer.email,
      lastname: state.customer.lastName,
      name: state.customer.name,
      phoneNumber: state.customer.phoneNumber || "",
      priorityCustomer: true,
      username: state.customer.userName,
      salesTaxId: "",
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const dispatch = useDispatch();
  const [salesTax, setsalesTax] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadSalesTax = () => {
    setLoading(true);
    getAllsalesTax()
      .then((response) => {
        setsalesTax(response.data);
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
    loadSalesTax();
  }, []);
  const removecustomer = (itemId) =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => history.push("/customers")}
          />
        ),
      })
    );

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<FormHeader removeCallback={removecustomer} />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            <h1>{state.customer.name}</h1>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            {loading ? <FuseLoading /> : <FormControls salesTax={salesTax} />}
          </div>
        }
      />
    </FormProvider>
  );
};

export default withProtectedRoute(CustomerForm);
