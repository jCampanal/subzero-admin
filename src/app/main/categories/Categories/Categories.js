import {memo, useState} from 'react';
import Button from '@material-ui/core/Button';
import CategoryForm from './CategoryForm';
import ConfirmDlg from "./ConfirmDlg";

const dummyCategories = [
  {id: 1, link: 'htp://site.com/cats/gue', name: 'Gue'},
  {id: 2, link: 'htp://site.com/cats/gue', name: 'Gue'},
  {id: 3, link: 'htp://site.com/cats/gue', name: 'Gue'},
  {id: 4, link: 'htp://site.com/cats/gue', name: 'Gue'},
  {id: 5, link: 'htp://site.com/cats/gue', name: 'Gue'},
  {id: 6, link: 'htp://site.com/cats/gue', name: 'Gue'},
  {id: 7, link: 'htp://site.com/cats/gue', name: 'Gue'},
  {id: 8, link: 'htp://site.com/cats/gue', name: 'Gue'},
  {id: 9, link: 'htp://site.com/cats/gue', name: 'Gue'},
];

function Categories() {
  const [formIsOpen, openForm] = useState(false);
  const [category, selectCategory] = useState({id: 0, link: "", name: ""});
  const [categories, setCategories] = useState(dummyCategories)
  const [confirmDelete, askForConfirmation] = useState(false);
  const toggleConfirmation = () => {
    askForConfirmation(!confirmDelete);
  };
  const toggleForm = () => {
    openForm(!formIsOpen);
  };
  const editCategory = (id) => {
    selectCategory(categories.filter(item => item.id === id)[0])
    toggleForm();
  };
  const deleteCategory = (id) => {
    setCategories(prevState => prevState.filter(item => item.id !== id))
    selectCategory({id: 0, link: "", name: ""});
    toggleConfirmation();
  };
  const saveCategory = (item) => {
    if (item.id === 0) {
      setCategories(old => old.push({id: old[old.length - 1].id + 1, link: item.link, name: item.name}))
    } else {
      setCategories(prevState => {
        prevState[prevState.findIndex((token) => token.id === item.id)] = item;
        return prevState;
      });
    }
  };
  const confirmBeforeDeleteCategory = (id) => {
    selectCategory(categories.filter(item => item.id === id)[0])
    toggleConfirmation();
  }
  return (
    <div>
      <div className="flex justify-center items-center min-w-full mb-14">
        <button
          onClick={toggleForm}
          className="transition duration-350 ease-in-out shadow hover:shadow-sm bg-blue-500 hover:bg-blue-600 text-gray-50 hover:text-white rounded px-14 py-6 uppercase leading-none">
          New Category
        </button>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                <tr scope="col" className="text-left tracking-wider border-t border-b">
                  <th className="px-14 py-3">Id</th>
                  <th className="px-14 py-3">Name</th>
                  <th className="px-14 py-3">Link</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {categories.map(item => (
                  <tr key={item.id} className="odd:bg-gray-200 hover:bg-gray-100">
                    <td className="px-14 py-3">{item.id}</td>
                    <td className="px-14 py-3">{item.name}</td>
                    <td className="px-14 py-3">{item.link}</td>
                    <td className="px-14 py-3">
                      <div className="flex justify-end items-center">
                        <button
                          onClick={() => editCategory(item.id)}
                          className="text-sm transition duration-350 ease-in-out shadow hover:shadow-none text-deep-orange-700 hover:text-deep-orange-800 leading-none px-14 py-6 uppercase mr-5">
                          <i className="fa fa-edit mr-4"/>Edit
                        </button>
                        <button
                          onClick={() => confirmBeforeDeleteCategory(item.id)}
                          className="text-sm transition duration-350 ease-in-out shadow hover:shadow-none text-red-700 hover:text-red-800 leading-none px-14 py-6 uppercase">
                          <i className="fa fa-trash mr-4"/>Delete
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
      <CategoryForm open={formIsOpen} handleClose={toggleForm} category={category} save={saveCategory}/>
      <ConfirmDlg open={confirmDelete} handleClose={toggleConfirmation} confirm={deleteCategory} subject={category}/>
    </div>
  );
}

export default memo(Categories);
