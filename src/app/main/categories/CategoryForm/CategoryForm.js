import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useHistory, useLocation, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FuseLoading from "@fuse/core/FuseLoading";
import { useDispatch } from "react-redux";
import FormControls from "./FormControls";
import FormHeader from "./FormHeader";
import {
  deleteCategory,
  postCategory,
  putCategory,
} from "../../../api-conn/categories";
import { showMessage } from "../../../store/fuse/messageSlice";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";

const CategoryForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const category = id
    ? location.state.category
    : { name: "", link: "", imageURL: "" };
  console.log("location", location);
  console.log("category", category);
  const { t } = useTranslation("category-form");
  const validationRules = yup.object().shape({
    name: yup
      .string()
      .required(t("REQUIRED"))
      .min(3, "MORE_THAN_2")
      .matches(/^[a-z]([\w ]*)[a-z]$/gi, "UNACCEPTED_CHARACTER"),
    link: yup
      .string()
      .required(t("REQUIRED"))
      .min(3, "MORE_THAN_2")
      .max(21, "LESS_THAN_10")
      .trim()
      .matches(/^[a-z]([\w]*)[a-z]$/gi, "UNACCEPTED_CHARACTER"),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const methods = useForm({
    defaultValues: {
      name: category.name,
      link: category.link.slice(category.link.lastIndexOf("/") + 1),
      file: null,
    },
    mode: "all",
    resolver: yupResolver(validationRules),
  });
  const { getValues } = methods;

  const saveData = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("Name", getValues().name);
    formData.append("Link", getValues().link);
    if (id === undefined && getValues().file !== null)
      formData.append("File", getValues().file);
    if (id) {
      putCategory(id, formData)
        .then(() => {
          setLoading(false);
          dispatch(
            showMessage({
              message: "Category saved!",
            })
          );
          history.push("/categories");
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showMessage({
              message: "Error trying to save category. Please try again later.",
              variant: "error",
            })
          );
        });
    } else {
      postCategory(formData)
        .then(() => {
          setLoading(false);
          dispatch(
            showMessage({
              message: "Category saved!",
            })
          );
          history.push("/categories");
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showMessage({
              message: "Error trying to save category. Please try again later.",
              variant: "error",
            })
          );
        });
    }
  };
  const onProceed = (itemId) => {
    setLoading(true);
    deleteCategory(JSON.stringify(itemId))
      .then(() => {
        setLoading(false);
        dispatch(
          showMessage({
            message: "Deletion completed!",
          })
        );
        history.push("/categories");
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showMessage({
            message: "Error during deletion. Please try again later",
            variant: "error",
          })
        );
        history.push("/categories");
      });
  };
  const removeCategory = (itemId) =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => onProceed(itemId)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a category, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );

  useEffect(() => {
    document.title = `${
      id ? "Edit category" : "Create category"
    } - Subzero Ice Service`;
  }, [id]);

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          content: "flex mx-14 justify-center",
          toolbar: "p-0",
          header: "",
        }}
        header={
          <FormHeader saveCallback={saveData} deleteCallback={removeCategory} />
        }
        contentToolbar={
          <div className="p-16 sm:p-24 max-w-2xl">
            {id ? <h1>{category.name}</h1> : <h1>{t("CREATE_NEW")}</h1>}
          </div>
        }
        content={
          loading ? (
            <FuseLoading />
          ) : (
            <FormControls imgUrl={category.imageURL} />
          )
        }
      />
    </FormProvider>
  );
};

export default CategoryForm;
