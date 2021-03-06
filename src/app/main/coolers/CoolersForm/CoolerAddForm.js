import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControls from "./FormAddControls";
import FormHeader from "./FormHeader";
import { getProvidersAll } from "../../../api-conn/providers";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";

const today = new Date();

const CoolerForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation();
  const cooler = id
    ? state.cooler
    : {
        code: "",
        pickedUp: today,
        providerId: "",
      };
  const { t } = useTranslation("coolers-form");
  const validationRules = yup.object().shape({
    code: yup.string().required(t("REQUIRED")),
    pickup: yup.date().required(t("REQUIRED")).max(today),
    providerId: yup.string().required(t("REQUIRED")),
  });

  const [providers, setProviders] = useState([]);
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      code: cooler.code,
      providerId: cooler.providerId,
      pickup: new Date(cooler.pickedUp),
      file: null,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const removeCooler = (itemId) =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => history.push("/coolers")}
          />
        ),
      })
    );

  useEffect(() => {
    const fetchAllProviders = async () => {
      const { data } = await getProvidersAll();
      setProviders(data);
    };
    fetchAllProviders();
  }, []);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "",
        }}
        header={<FormHeader removeCallback={removeCooler} />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            {id ? <h1>{cooler.code}</h1> : <h1>{t("CREATE_NEW")}</h1>}
          </div>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FormControls providers={providers} imageURL={cooler.imageURL} />
          </div>
        }
      />
    </FormProvider>
  );
};

export default withProtectedRoute(CoolerForm);
