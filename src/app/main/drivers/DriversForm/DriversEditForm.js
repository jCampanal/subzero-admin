import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./EditFormControls";
import FormHeader from "./FormHeader";

import { getAllUsers } from "app/api-conn/User";
import FuseLoading from "@fuse/core/FuseLoading";
import { getAllWarehouses } from "app/api-conn/warehouses";
import { showMessage } from "app/store/fuse/messageSlice";

const today = new Date();

const validationRules = yup.object().shape({
  userId: yup.string().required("REQUIRED"),
  warehouseId: yup.string().required("REQUIRED"),
});

const CustomerForm = () => {
  const {
    user: { logged },
  } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      userId: "",
      warehouseId: "",
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const { state } = useLocation();

  const driver = state.driver;
  const [warehouses, setWarehouses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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

export default CustomerForm;
