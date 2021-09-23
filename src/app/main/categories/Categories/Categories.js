import { lazy, memo, useState } from "react";
import FusePageCarded from "../../../../@fuse/core/FusePageCarded";

const Header = lazy(() => import("app/main/products/Products/PageCardedHeader"));
const CategoriesTable = lazy(() => import("./CategoriesTable"));
const CategoryForm = lazy(() => import("./CategoryForm"));
const ConfirmDlg = lazy(() => import("./ConfirmDlg"));

const rows = [
    {
        id: 'image',
        align: 'left',
        disablePadding: true,
        label: '',
        sort: false,
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Name',
        sort: true,
    },
    {
        id: 'link',
        align: 'left',
        disablePadding: false,
        label: 'Link',
        sort: true,
    },
    {
        id: 'actions',
        align: 'right',
        disablePadding: false,
        label: '',
        sort: false,
    },
];
const dummyCategories = [
  { id: 1, link: "htp://site.com/cats/gue", name: "Gue" },
  { id: 2, link: "htp://site.com/cats/gue", name: "Gue" },
  { id: 3, link: "htp://site.com/cats/gue", name: "Gue" },
  { id: 4, link: "htp://site.com/cats/gue", name: "Gue" },
  { id: 5, link: "htp://site.com/cats/gue", name: "Gue" },
  { id: 6, link: "htp://site.com/cats/gue", name: "Gue" },
  { id: 7, link: "htp://site.com/cats/gue", name: "Gue" },
  { id: 8, link: "htp://site.com/cats/gue", name: "Gue" },
  { id: 9, link: "htp://site.com/cats/gue", name: "Gue" },
];

function Categories() {
  const [formIsOpen, openForm] = useState(false);
  const [category, selectCategory] = useState({ id: 0, link: "", name: "" });
  const [categories, setCategories] = useState(dummyCategories);
  const [confirmDelete, askForConfirmation] = useState(false);
  const toggleConfirmation = () => {
    askForConfirmation(!confirmDelete);
  };
  const toggleForm = () => {
    openForm(!formIsOpen);
  };
  const editCategory = (id) => {
    selectCategory(categories.filter((item) => item.id === id)[0]);
    toggleForm();
  };
  const deleteCategory = (id) => {
    setCategories((prevState) => prevState.filter((item) => item.id !== id));
    selectCategory({ id: 0, link: "", name: "" });
    toggleConfirmation();
  };
  const saveCategory = (item) => {
    if (item.id === 0) {
      setCategories((old) => {
        old.push({
          id: old[old.length - 1].id + 1,
          link: item.link,
          name: item.name,
        });
        return old;
      });
    } else {
      setCategories((prevState) => {
        prevState[prevState.findIndex((token) => token.id === item.id)] = item;
        return prevState;
      });
    }
  };
  const confirmBeforeDeleteCategory = (id) => {
    selectCategory(categories.filter((item) => item.id === id)[0]);
    toggleConfirmation();
  };
  return (
    <>
      <FusePageCarded
        classes={{
          content: "flex",
          contentCard: "overflow-hidden",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={
          <Header
              iconText='category'
            title="Categories"
            addButtonLabel="New Category"
            searchHint="Search category by name"
          />
        }
        content={<CategoriesTable categories={dummyCategories} rows={rows} />}
        innerScroll
      />
      <CategoryForm
        open={formIsOpen}
        handleClose={toggleForm}
        category={category}
        save={saveCategory}
      />
      <ConfirmDlg
        open={confirmDelete}
        handleClose={toggleConfirmation}
        confirm={deleteCategory}
        subject={category}
      />
    </>
  );
}

export default memo(Categories);
