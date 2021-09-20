import {memo, useState} from 'react';
import {ShoppingCart} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ProductForm from './ProductForm';
import ConfirmDlg from './ConfirmDlg';

const dummyProducts = [
    {id: 1, category: 'Lorem', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true},
    {id: 2, category: 'Dolor', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true},
    {id: 3, category: 'Ipsum', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true},
    {id: 4, category: 'Dolor', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true},
    {id: 5, category: 'Dolor', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true},
    {id: 6, category: 'Lorem', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true},
    {id: 7, category: 'Ipsum', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true},
    {id: 8, category: 'Ipsum', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true},
    {id: 9, category: 'Lorem', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true},
];

function Products() {
    const [formIsOpen, openForm] = useState(false);
    const [product, selectProduct] = useState({
        id: 0,
        category: '',
        name: '',
        units: '',
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
        selectProduct({id: 0, category: '', name: '', units: '', visible: false});
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
        <div>
            <p className="h1">
                <ShoppingCart className="text-5xl mr-14" />
                Products <span className="text-gray-50 rounded-full px-16 bg-blue-600">{dummyProducts.length}</span>
            </p>
            <div className="flex justify-center items-center min-w-full mb-14">
                <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white" onClick={toggleForm}>
                    New Product
                </Button>
            </div>
            <div className="mt-2 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                                <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                                    <tr className="text-left tracking-wider border-t border-b">
                                        <th scope="col" className="px-14 py-3">
                                            Id
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Units
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Visible
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((item) => (
                                        <tr key={item.id} className="odd:bg-gray-200 hover:bg-gray-100">
                                            <td className="px-14 py-3">{item.id}</td>
                                            <td className="px-14 py-3">{item.category}</td>
                                            <td className="px-14 py-3">{item.name}</td>
                                            <td className="px-14 py-3">{item.units}</td>
                                            <td className="px-14 py-3">
                                                {item.visible ? (
                                                    <i className="fa fa-check-circle text-green-800" />
                                                ) : (
                                                    <i className="fa fa-times-circle text-red-800" />
                                                )}
                                            </td>
                                            <td className="px-14 py-3">
                                                <div className="flex justify-end items-center">
                                                    <Button onClick={() => editProduct(item.id)}>
                                                        <i className="fa fa-edit mr-4" />
                                                        Edit
                                                    </Button>
                                                    <Button onClick={() => confirmBeforeDeleteCategory(item.id)}>
                                                        <i className="fa fa-trash mr-4" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ProductForm open={formIsOpen} handleClose={toggleForm} product={product} save={saveProduct} />
            <ConfirmDlg open={confirmDelete} handleClose={toggleConfirmation} confirm={deleteProduct} subject={product} />
        </div>
    );
}

export default memo(Products);
