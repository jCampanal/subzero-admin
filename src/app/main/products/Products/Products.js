import FusePageCarded from "@fuse/core/FusePageCarded";
import { lazy, memo, useState } from "react";

const Header = lazy(() => import("./PageCardedHeader"));
const ProductsTable = lazy(() => import("./ProductsTable"));
const ProductForm = lazy(() => import("./ProductForm"));
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
        id: 'category',
        align: 'left',
        disablePadding: false,
        label: 'Category',
        sort: true,
    },
    {
        id: 'units',
        align: 'right',
        disablePadding: false,
        label: 'Units',
        sort: true,
    },
    {
        id: 'visible',
        align: 'right',
        disablePadding: false,
        label: 'Visible',
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

const dummyProducts = [
    {
        id: 1,
        category: "Lorem",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 2,
        category: "Dolor",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 3,
        category: "Ipsum",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 4,
        category: "Dolor",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 5,
        category: "Dolor",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 6,
        category: "Lorem",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 7,
        category: "Ipsum",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 8,
        category: "Ipsum",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 9,
        category: "Lorem",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 10,
        category: "Lorem",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
    {
        id: 11,
        category: "Lorem",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: false,
    },
    {
        id: 12,
        category: "Lorem",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: false,
    },
    {
        id: 13,
        category: "Lorem",
        name: "Grep",
        units: "Gue Ueg Egu Geu",
        visible: true,
    },
];

function Products() {
    const [formIsOpen, openForm] = useState(false);
    const [product, selectProduct] = useState({
        id: 0,
        category: "",
        name: "",
        units: "",
        visible: false,
    });
    const [products, setProducts] = useState(dummyProducts);
    const [confirmDelete, askForConfirmation] = useState(false);
    const toggleConfirmation = () => {
        askForConfirmation(!confirmDelete);
    };
    const toggleForm = () => {
        openForm(!formIsOpen);
    };
    const editProduct = (id) => {
        selectProduct(products.filter((item) => item.id === id)[0]);
        toggleForm();
    };
    const deleteProduct = (id) => {
        setProducts((prevState) => prevState.filter((item) => item.id !== id));
        selectProduct({ id: 0, category: "", name: "", units: "", visible: false });
        toggleConfirmation();
    };
    const saveProduct = (item) => {
        if (item.id === 0) {
            setProducts((old) => {
                old.push({
                    id: old[old.length - 1].id + 1,
                    category: item.category,
                    name: item.name,
                    units: item.units,
                    visible: item.visible,
                });
                return old;
            });
        } else {
            setProducts((prevState) => {
                prevState[prevState.findIndex((token) => token.id === item.id)] = item;
                return prevState;
            });
        }
    };
    const confirmBeforeDeleteCategory = (id) => {
        selectProduct(products.filter((item) => item.id === id)[0]);
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
                header={<Header iconText="shopping_cart" title="Products" addButtonLabel="New Product" searchHint="Search product by name" />}
                content={<ProductsTable products={dummyProducts} rows={rows} />}
                innerScroll
            />
            <ProductForm
                open={formIsOpen}
                handleClose={toggleForm}
                product={product}
                save={saveProduct}
            />
            <ConfirmDlg
                open={confirmDelete}
                handleClose={toggleConfirmation}
                confirm={deleteProduct}
                subject={product}
            />
        </>
    );
}

export default memo(Products);
