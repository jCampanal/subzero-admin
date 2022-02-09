import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useDispatch, useSelector } from "react-redux";
import FormHeader from "./FormHeader";
import FormControls from "./FormControls";
import { closeDialog, openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import { deleteWarehouse } from "../../../api-conn/warehouses";
import { showMessage } from "../../../store/fuse/messageSlice";

const WarehouseForm = () => {
  const {
    user: { logged },
  } = useSelector((state) => state);
  const { t } = useTranslation("warehouse-form");
  const { id } = useParams();
  const { state } = useLocation();
  const history = useHistory();
  const warehouse = id ? state.warehouse : undefined;
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      name: id ? warehouse.name : "",
      street: id ? warehouse.address.street : "",
      city: id ? warehouse.address.city : "",
      state: id ? warehouse.address.state : "",
      zipCode: id ? warehouse.address.zipCode : "",
      addressId: id ? warehouse.address.id : undefined,
    },
  });

  const onProceed = () => {
    dispatch(closeDialog());
    const deleteItem = async () => {
      const { status, error } = await deleteWarehouse(id)
        .then((response) => ({ status: response.status }))
        .catch((err) => ({ error: err }));
      if (status === "200") {
        dispatch(
          showMessage({
            message: "The warehouse was removed successfully",
            anchorOrigin: { vertical: "top", horizontal: "right" },
            variant: "success",
          })
        );
        history.push("/warehouses");
      }
      if (error) {
        if (error) {
          dispatch(
            showMessage({
              message: `${error.message}`,
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            })
          );
        }
      }
    };
    deleteItem().finally();
  };

  const remove = () =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={id}
            proceedCallback={() => onProceed()}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a warehouse, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );

  useEffect(() => {
    if (!logged) history.push("/login");
  }, [logged, history]);
  useEffect(() => {
    document.title = id ? t("PAGE_TITLE_EDITING") : t("PAGE_TITLE_CREATING");
  }, [id, t]);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "",
        }}
        header={<FormHeader removeCallback={() => remove()} />}
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            {id ? <h1>{warehouse.name}</h1> : <h1>{t("CREATE_NEW")}</h1>}
          </div>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FormControls />
          </div>
        }
      />
    </FormProvider>
  );
};

export default WarehouseForm;
