import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useParams } from "react-router";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./FormControls";
import FormHeader from "./FormHeader";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import FuseLoading from "@fuse/core/FuseLoading";
import { showMessage } from "app/store/fuse/messageSlice";
import whithProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { getAllCustomers } from "app/api-conn/customers";
import { getAllDrivers } from "app/api-conn/drivers";
import { getAllProducts } from "app/api-conn/products";
import { intRegex, phoneRegex } from "app/lib/regexs";
import { getAllOrders } from "app/api-conn/shipments_order";
import { dummyOrders } from "../Shipments/Orders/Orders";

const validationRules = yup.object().shape({
  orderId: yup.string().required(t("REQUIRED")),
  driverId: yup.string().required(t("REQUIRED")),
});

const ShipmentAddForm = () => {
  const history = useHistory();
  const [orderAll, setOrderAll] = useState(dummyOrders);
  const [driverAll, setDrivertAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("Shipments");
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      orderId: "",
      driverId: "",
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });

  const loadOrders = () => {
    setLoading(true);
    getAllOrders()
      .then((response) => {
        // setOrderAll(response.data.data); esto va en realidad
        setOrderAll(response.data);
        console.log("setOrderAll(response.data.data);", response.data.data);
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

  const loadDrivers = () => {
    setLoading(true);
    getAllDrivers()
      .then((response) => {
        setDrivertAll(response.data.data);
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
    // loadOrders();
    loadDrivers();
  }, []);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<FormHeader />}
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            {loading ? (
              <FuseLoading />
            ) : (
              <FormControls orders={orderAll} drivers={driverAll} />
            )}
          </div>
        }
      />
    </FormProvider>
  );
};

export default memo(whithProtectedRoute(ShipmentAddForm));
