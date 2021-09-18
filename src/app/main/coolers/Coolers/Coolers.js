import { memo, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ConfirmDlg from './ConfirmDlg';
import CoolerForm from './CoolerForm';

const dummyCoolers = [
  {
    id: 1,
    code: 0,
    provider: 'Grep',
    status: 'Gue Ueg Egu Geu',
    registrationDate: new Date(),
  },
];

function Coolers() {
  const [formIsOpen, openForm] = useState(false);
  const [cooler, selectCooler] = useState({
    id: 0,
    code: 0,
    provider: '',
    status: '',
    registrationDate: new Date(),
  });
  const [coolers, setCoolers] = useState(dummyCoolers);
  const [confirmDelete, askForConfirmation] = useState(false);
  const [selectedFromDate, selectFromDate] = useState(undefined);
  const handleFromDateChange = (date) => {
    selectFromDate(date);
  };
  const [selectedToDate, selectToDate] = useState(undefined);
  const handleToDateChange = (date) => {
    selectToDate(date);
  };
  const toggleForm = () => {
    openForm(!formIsOpen);
  };
  const editCooler = (id) => {
    selectCooler(coolers.filter((item) => item.id === id)[0]);
    toggleForm();
  };
  const saveCooler = (item) => {
    if (item.id === 0) {
      setCoolers((old) => {
        old.push({
          id: old[old.length - 1].id + 1,
          code: item.code,
          provider: item.provider,
          status: '',
          registrationDate: new Date(),
        });
        return old;
      });
    } else {
      setCoolers((prevState) => {
        prevState[prevState.findIndex((token) => token.id === item.id)] = item;
        return prevState;
      });
    }
  };
  const toggleConfirmation = () => {
    askForConfirmation(!confirmDelete);
  };
  const deleteCooler = (id) => {
    setCoolers((prevState) => prevState.filter((item) => item.id !== id));
    selectCooler({ id: 0, code: 0, provider: '', status: '', registrationDate: new Date() });
    toggleConfirmation();
  };
  const confirmBeforeDelete = (id) => {
    selectCooler(coolers.filter((item) => item.id === id)[0]);
    toggleConfirmation();
  };
  return (
    <div>
      <p className="h1">
        <i className="fa fa-calendar mr-4" />
        Coolers{' '}
        <span className="text-gray-50 rounded-full px-16 bg-blue-600">{coolers.length}</span>
      </p>
      <div className="flex justify-center items-center min-w-full mb-10 gap-7">
        <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-700 text-white"
          onClick={toggleForm}
        >
          Register new cooler
        </Button>
        <Button
          href="#"
          className="text-blue-600 hover:text-blue-800 hover:no-underline"
          role="button"
        >
          Providers
        </Button>
        <Button
          href="#"
          className="text-blue-600 hover:text-blue-800 hover:no-underline"
          role="button"
        >
          Clients
        </Button>
      </div>
      <div className="flex justify-center items-center min-w-full mb-14 gap-7">
        <TextField label="Code" name="code" className="mt-7" />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="From start date"
            value={selectedFromDate}
            onChange={handleFromDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="To end date"
            value={selectedToDate}
            onChange={handleToDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white">
          Search
        </Button>
        <Button variant="contained" className="bg-gray-500 hover:bg-gray-600 text-white">
          Clear
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
                      Code
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Provider
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Registration date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coolers.map((item) => (
                    <tr key={item.id} className="odd:bg-gray-200 hover:bg-gray-100">
                      <td className="px-14 py-3">{item.id}</td>
                      <td className="px-14 py-3">{item.code}</td>
                      <td className="px-14 py-3">{item.provider}</td>
                      <td className="px-14 py-3">{item.status}</td>
                      <td className="px-14 py-3">{item.registrationDate.toLocaleString()}</td>
                      <td className="px-14 py-3">
                        <div className="flex justify-end items-center">
                          <Button
                            type="button"
                            onClick={() => editCooler(item.id)}
                            className="text-sm text-gray-700 hover:text-gray-800 leading-none rounded-md mr-5"
                          >
                            <i className="fa fa-edit mr-4" />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            onClick={() => confirmBeforeDelete(item.id)}
                            className="text-sm text-red-700 hover:text-red-800 leading-none rounded-md"
                          >
                            <i className="fa fa-trash mr-4" />
                            Erase
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
      <CoolerForm open={formIsOpen} handleClose={toggleForm} cooler={cooler} save={saveCooler} />
      <ConfirmDlg
        open={confirmDelete}
        handleClose={toggleConfirmation}
        confirm={deleteCooler}
        subject={cooler}
      />
    </div>
  );
}

export default memo(Coolers);
