import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./AddFormControls";
import FormHeader from "./FormHeader";
import { getProvidersAll } from "../../../api-conn/providers";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import FuseLoading from "@fuse/core/FuseLoading";
import { getAllWarehouses } from "app/api-conn/warehouses";
import { showMessage } from "app/store/fuse/messageSlice";

const validationRules = yup.object().shape({
  userName: yup.string().required("REQUIRED"),
  name: yup.string().required("REQUIRED"),
  lastName: yup.string().required("REQUIRED"),
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
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  confirmPassword: yup
    .string()
    .max(255)
    .min(6)
    .required("REQUIRED")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  warehouseId: yup.string().required("REQUIRED"),
  phoneNumber: yup.string(),
  image: yup.mixed(),
});

const driverForm = () => {
  const {
    user: { logged },
  } = useSelector((state) => state);
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation();

  const driver = {
    userName: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    warehouseId: "",
    phoneNumber: "",
    image: null,
  };
  const { t } = useTranslation("drivers-form");
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      userName: driver.userName,
      name: driver.name,
      lastName: driver.lastName,
      email: driver.email,
      password: driver.password,
      confirmPassword: driver.confirmPassword,
      warehouseId: driver.warehouseId,
      phoneNumber: driver.phoneNumber,
      image: null,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadWareHouses = () => {
    setLoading(true);
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

  useEffect(() => {
    loadWareHouses();
  }, []);
  // const removedriver = (itemId) =>
  //   dispatch(
  //     openDialog({
  //       children: (
  //         <RemoveDlg
  //           itemId={itemId}
  //           proceedCallback={() => history.push("/drivers")}
  //         />
  //       ),
  //     })
  //   );

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
            {id ? <h1>{driver.code}</h1> : <h1>{t("CREATE_NEW")}</h1>}
          </div>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            {loading ? (
              <FuseLoading />
            ) : (
              <FormControls warehouses={warehouses} />
            )}
          </div>
        }
      />
    </FormProvider>
  );
};

export default driverForm;
