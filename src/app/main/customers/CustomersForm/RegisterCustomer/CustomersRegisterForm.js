import FuseLoading from "@fuse/core/FuseLoading";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Icon } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { postCustomer, verifyCustomer } from "app/api-conn/customers";

import { getAllsalesTax } from "app/api-conn/saleTaxes";
import { showMessage } from "app/store/fuse/messageSlice";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import * as yup from "yup";

import Controls from "./Controls";
import { useTranslation } from "react-i18next";
import { intRegex, phoneRegex } from "app/lib/regexs";

const CustomersRegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation("customers-form");

  const [salesTax, setsalesTax] = useState([]);
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [verifying, setVerifying] = useState(true);

  const urlData = {
    id: new URLSearchParams(location.search).get("UserId"),
    token: new URLSearchParams(location.search).get("Token"),
    companyName: new URLSearchParams(location.search).get("CompanyName"),
    saleTaxId: new URLSearchParams(location.search).get("SalesTxId"),
  };
  const validationRules = yup.object().shape({
    city: yup.string(),
    companyName: yup.string(),
    confirmPassword: yup
      .string()
      .max(255)
      .min(6)
      .required(t("REQUIRED"))
      .test("passwords-match", t("MATCH_PASS"), function (value) {
        return this.parent.password === value;
      }),
    lastname: yup.string().required(t("REQUIRED")),
    name: yup.string().required(t("REQUIRED")),
    password: yup
      .string()
      .max(255)
      .min(6)
      .required(t("REQUIRED"))
      .matches(/^(?=.*[a-z])/, t("NOT_LETTER"))
      .matches(/^(?=.*[A-Z])/, t("NOT_CHARATER"))
      .matches(/^(?=.*[0-9])/, t("NOT_PASS_NUMBER"))
      .matches(/^(?=.*[!@#$%&*_+-,./';)(><^=-?])/, t("NOT_SPECIAL_CHARATER")),
    phoneNumber: yup.string().matches(phoneRegex, {
      message: t("NOT_PHONE"),
      excludeEmptyString: true,
    }),
    salesTaxId: yup.string().required(t("REQUIRED")),
    state: yup.string(),
    street: yup.string(),
    username: yup.string().required(t("REQUIRED")),
    zipCode: yup.string().matches(intRegex, {
      message: t("NOT_NUMBER"),
      excludeEmptyString: true,
    }),
  });

  const methods = useForm({
    defaultValues: {
      city: "",
      companyName: urlData.companyName,
      confirmPassword: "",
      lastname: "",
      name: "",
      password: "",
      phoneNumber: "",
      salesTaxId: urlData.saleTaxId,
      state: "",
      street: "",
      username: "",
      zipCode: "",
      image: null,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  const {
    handleSubmit,
    formState: { dirtyFields, isValid },
  } = methods;

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

  const checkCustomer = () => {
    setLoading(true);

    const { id, token, companyName, saleTaxId } = urlData;
    verifyCustomer(id, token, companyName, saleTaxId)
      .then((res) => {
        setIsVerified(true);
        setLoading(false);
        setVerifying(false);
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: t("VERIFY"),
            variant: "error",
          })
        );
        setLoading(false);
        setIsVerified(false);
        setVerifying(false);
      });
  };

  useEffect(() => {
    loadSalesTax();
    checkCustomer();
  }, [location]);

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("CompanyName", data.companyName),
      formData.append("ConfirmPassword", data.confirmPassword),
      formData.append("Password", data.password),
      formData.append("Lastname", data.lastname);
    formData.append("Name", data.name),
      formData.append("SalesTxId", data.salesTaxId),
      formData.append("Username", data.username),
      formData.append("Street", data.street),
      formData.append("State", data.state),
      formData.append("City", data.city),
      formData.append("ZipCode", data.zipCode);

    if (data.phoneNumber !== "") {
      formData.append("PhoneNumber", data.phoneNumber);
    }

    if (data.image) {
      formData.append("Image", data.image);
    }

    postCustomer(urlData.id, formData)
      .then(() => {
        dispatch(
          showMessage({
            message: t("SUCCESS_CREATE"),
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
        history.push("/customers");
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: error.response.data.message ?? error.response.data.title,
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          })
        );
      });
  };

  return (
    <>
      {verifying ? (
        <FuseLoading message="Verifiando usuario espere un momento por favor" />
      ) : loading ? (
        <FuseLoading />
      ) : isVerified ? (
        <FormProvider {...methods}>
          <div className="w-full h-full pb-56 bg-grey-50">
            <div className="w-full flex justify-center ">
              <div className="w-11/12 sm:w-3/4 max-w-640 mt-72 bg-grey-50-500  rounded-8 shadow-20 p-44 pt-56 pb-56 text-center">
                <h1 className="mb-10 justify-center">Get Started</h1>
                <p className="mb-10">
                  Already have an account?
                  <Link to={"/login"}> Login</Link>
                </p>

                <main>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Controls salesTax={salesTax} />
                    <div className="w-full">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        fullWidth
                        disabled={dirtyFields === {} || !isValid}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </main>
              </div>
            </div>
          </div>
        </FormProvider>
      ) : (
        <div className="h-full items-center flex justify-center text-center flex-col px-52">
          <div className="flex items-center flex-wrap justify-center mb-14">
            <span className="mr-10">
              <Cancel fontSize="large" />
            </span>{" "}
            <h1>Usuario no verificado </h1>
          </div>
          <p className="max-w-lg">
            Comuniquese con un manager para revisar su problema o intente
            recargar la pagina. Tenga en cuenta que solo se puede llegar aqui
            mediante un link enviado al email.
          </p>
        </div>
      )}
    </>
  );
};

export default CustomersRegisterForm;
