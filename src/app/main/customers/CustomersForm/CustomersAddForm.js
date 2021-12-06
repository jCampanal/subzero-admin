import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./FormAddControls";
import FormHeader from "./FormHeader";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import FuseLoading from "@fuse/core/FuseLoading";
import { getAllsalesTax } from "app/api-conn/saleTaxes";
import { showMessage } from "app/store/fuse/messageSlice";

const validationRules = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("REQUIRED"),
  companyName: yup.string().required("REQUIRED"),
  salesTaxId: yup.string().required("REQUIRED"),
  callbackURL: yup.string().required("REQUIRED"),
});

const CustomerForm = () => {
  const {
    user: { logged },
  } = useSelector((state) => state);
  const history = useHistory();
  const { id } = useParams();
  const [salesTax, setsalesTax] = useState([]);
  const [loading, setLoading] = useState(false);

  const customer = {
    email: "",
    companyName: "",
    salesTaxId: "",
    callbackURL: "",
  };
  const { t } = useTranslation("customers-form");
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      email: customer.email,
      companyName: customer.companyName,
      salesTaxId: customer.salesTaxId,
      callbackURL: customer.callbackURL,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
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

  const loadSalesTax = () => {
    setLoading(true);
    getAllsalesTax()
      .then((response) => {
        setsalesTax(response.data);
        setLoading(false);
        console.log("response.data", response.data);
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
        header={<FormHeader removeCallback={removecustomer} />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            {id ? <h1>{customer.code}</h1> : <h1>{t("CREATE_NEW")}</h1>}
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

export default CustomerForm;
