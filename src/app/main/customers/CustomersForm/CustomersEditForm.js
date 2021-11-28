import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./FormControls";
import FormHeader from "./FormHeader";
import { getProvidersAll } from "../../../api-conn/providers";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";

const today = new Date();

const validationRules = yup.object().shape({
  userName: yup.string().required("REQUIRED"),
  lastName: yup.string().required("REQUIRED"),
  password: yup.string().required("REQUIRED"),
  confirmPassword: yup.string().required("REQUIRED"),
  phoneNumber: yup.string(),
  companyName: yup.string().required("REQUIRED"),
  companyAddressStreet: yup.string().required("REQUIRED"),
  companyAddressCity: yup.string().required("REQUIRED"),
  companyAddressState: yup.string().required("REQUIRED"),
  companyAddressZipCode: yup.string().required("REQUIRED"),
  SalesTxId: yup.string().required("REQUIRED"),
});

const CustomerForm = () => {
  const {
    user: { logged },
  } = useSelector((state) => state);
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation();

  const customer = id
    ? state.customer
    : {
        id: "",
        priorityCustomer: false,
        userName: "",
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        company: {
          id: "",
          name: "",
        },
      };
  const { t } = useTranslation("customers-form");
  const [providers, setProviders] = useState([]);
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      priorityCustomer: customer.priorityCustomer,
      userName: customer.userName,
      name: customer.name,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      company: {
        id: customer.company.id,
        name: customer.company.name,
      },
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

  useEffect(() => {
    if (!logged) history.push("/login");
    return <></>;
  }, [logged, history]);
  useEffect(() => {
    const fetchAllProviders = async () => {
      const { data } = await getProvidersAll();
      setProviders(data);
    };
    fetchAllProviders().finally();
  }, []);

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
            <FormControls providers={providers} imageURL={customer.imageURL} />
          </div>
        }
      />
    </FormProvider>
  );
};

export default CustomerForm;
