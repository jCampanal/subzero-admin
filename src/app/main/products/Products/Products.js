import FusePageCarded from "@fuse/core/FusePageCarded";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../../api-conn/products";
import { showMessage } from "../../../store/fuse/messageSlice";
import rows from "../../../common/productRows";
import FuseLoading from "../../../../@fuse/core/FuseLoading";
import { openDialog } from "../../../store/fuse/dialogSlice";
import RemoveDlg from "../../../common/removeDlg";
import PageCardedHeader from "app/components/HeaderPage/PageCardedHeader";
import ProductsTable from "./ProductsTable";

function Products() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation("products");
  const {
    user: { logged },
  } = useSelector((state) => state);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const createProduct = () => history.push("/products/create");

  const loadProducts = (pageSize = 10, pageNumber = 0, name = "") => {
    setLoading(true);
    getProducts(pageSize, pageNumber, name)
      .then((data) => {
        setProducts(data.data.data);
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: t("PROBLEM_FETCHING"),
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            variant: "error",
          })
        );
        setLoading(false);
      });
  };
  const editProduct = (productId) => {
    const product = products.filter((item) => item.id === productId)[0];
    history.push(`/products/${productId}/edit`, { product });
  };
  const onProceed = (itemIds) => {
    setLoading(true);
    deleteProduct(JSON.stringify(itemIds))
      .then(() => {
        dispatch(
          showMessage({
            message: "Deletion completed!",
          })
        );
        loadProducts();
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
  const removeProduct = (itemIds) =>
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemIds}
            proceedCallback={() => onProceed(itemIds)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a product, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );
  const submitFilter = (searchPattern) => {
    history.push(`/products?name=${searchPattern}`);
  };

  useEffect(() => {
    if (!logged) history.push("/login");
  }, [logged, history]);
  useEffect(() => {
    document.title = "Products - Subzero Ice Services";
  }, []);
  useEffect(loadProducts, [dispatch, t]);

  return (
    <FusePageCarded
      classes={{
        content: "flex mx-14",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <PageCardedHeader
          iconText="shopping_cart"
          title={t("PRODUCTS")}
          addButtonLabel={t("ADD_PRODUCT")}
          addButtonCallback={createProduct}
          searchHint={t("SEARCH_BY_NAME")}
          searchCallback={loadProducts}
          submitFilter={submitFilter}
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <ProductsTable
            data={products}
            rows={rows}
            editCallback={editProduct}
            deleteCallback={removeProduct}
            loadDataCallback={loadProducts}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(Products);
