import { memo, useState } from 'react';
import ProductForm from './ProductForm';
import ConfirmDlg from './ConfirmDlg';

const dummyProducts = [
  { id: 1, category: 'Lorem', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true },
  { id: 2, category: 'Dolor', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true },
  { id: 3, category: 'Ipsum', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true },
  { id: 4, category: 'Dolor', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true },
  { id: 5, category: 'Dolor', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true },
  { id: 6, category: 'Lorem', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true },
  { id: 7, category: 'Ipsum', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true },
  { id: 8, category: 'Ipsum', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true },
  { id: 9, category: 'Lorem', name: 'Grep', units: 'Gue Ueg Egu Geu', visible: true },
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
    selectProduct({ id: 0, category: '', name: '', units: '', visible: false });
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
      <div className="flex justify-center items-center min-w-full mb-14">
        <button
          type="button"
          onClick={toggleForm}
          className="transition duration-350 ease-in-out shadow hover:shadow-sm bg-blue-500 hover:bg-blue-600 text-gray-50 hover:text-white rounded px-14 py-6 uppercase leading-none"
        >
          New Product
        </button>
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
                          <button
                            type="button"
                            onClick={() => editProduct(item.id)}
                            className="text-sm transition duration-350 ease-in-out shadow hover:shadow-none text-deep-orange-700 hover:text-deep-orange-800 leading-none px-14 py-6 uppercase mr-5"
                          >
                            <i className="fa fa-edit mr-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => confirmBeforeDeleteCategory(item.id)}
                            className="text-sm transition duration-350 ease-in-out shadow hover:shadow-none text-red-700 hover:text-red-800 leading-none px-14 py-6 uppercase"
                          >
                            <i className="fa fa-trash mr-4" />
                            Delete
                          </button>
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
    </div>
  );
}

export default memo(Products);
