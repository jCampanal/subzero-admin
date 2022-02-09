import React, { memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteCategory, getCategories } from "../../../api-conn/categories";
import rows from "./rows";
import FuseLoading from "../../../../@fuse/core/FuseLoading";
import { showMessage } from "../../../store/fuse/messageSlice";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import PageCardedHeader from "../../products/Products/PageCardedHeader";
import CategoriesTable from "./CategoriesTable";

function Categories() {
  const {
    user: { logged },
  } = useSelector((state) => state);
  const history = useHistory();
  const { t } = useTranslation("categories");
  const dispatch = useDispatch();
  const [categories, populateCategories] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  const loadCategories = (pageSize = 10, pageNumber = 0, pattern = "") => {
    setLoading(true);
    getCategories(pageSize, pageNumber, pattern)
      .then((data) => {
        populateCategories(data.data);
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          showMessage({
            message:
              "We are facing problems trying to get categories list, please try again later",
            variant: "error",
          })
        );
        setLoading(false);
      });
  };
  const createCategory = () => {
    history.push("/categories/create");
  };
  const editCategory = (categoryId) => {
    console.log();
    const category = categories.data.filter(
      (item) => item.id === categoryId
    )[0];
    history.push(`/categories/${categoryId}/edit`, { category });
  };
  const onProceed = (itemId) => {
    setLoading(true);
    deleteCategory(JSON.stringify(itemId))
      .then(() => {
        dispatch(
          showMessage({
            message: "Deletion completed!",
          })
        );
        loadCategories();
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "Error during deletion. Please try again later",
            variant: "error",
          })
        );
        setLoading(false);
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
    if (!logged) history.push("/login");
  }, [logged, history]);
  useEffect(() => {
    document.title = "Categories - Subzero Ice Services";
  }, []);
  useEffect(loadCategories, [dispatch]);

  return (
    <FusePageCarded
      classes={{
        content: "flex mx-14",
        contentCard: "overflow-hidden",
        header: "",
      }}
      header={
        <PageCardedHeader
          iconText="category"
          title={t("CATEGORIES")}
          addButtonLabel={t("ADD_CATEGORY")}
          addButtonCallback={createCategory}
          searchHint={t("SEARCH_BY_NAME")}
          searchCallback={loadCategories}
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <CategoriesTable
            categories={categories}
            rows={rows}
            editCallback={editCategory}
            deleteCallback={removeCategory}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(Categories);
