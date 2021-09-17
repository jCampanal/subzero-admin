import { memo, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const dummyCoolers = [
  {
    code: 1,
    from: 'Gue',
    to: 'Ueg',
    driver: 'Gue Ueg Egu Geu',
    date: new Date(),
  },
];

function CoolersActivity() {
  const [coolers, setCoolers] = useState(dummyCoolers);
  const [selectedFromDate, selectFromDate] = useState(undefined);
  const handleFromDateChange = (date) => {
    selectFromDate(date);
  };
  const [selectedToDate, selectToDate] = useState(undefined);
  const handleToDateChange = (date) => {
    selectToDate(date);
  };
  return (
    <div>
      <p className="h1">
        <i className="fa fa-history mr-4" />
        Coolers Activity{' '}
        <span className="text-gray-50 rounded-full px-16 bg-blue-600">{coolers.length}</span>
      </p>
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
                      Code
                    </th>
                    <th scope="col" className="px-14 py-3">
                      From
                    </th>
                    <th scope="col" className="px-14 py-3">
                      To
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Driver
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coolers.map((item, index) => (
                    <tr key={index} className="odd:bg-gray-200 hover:bg-gray-100">
                      <td className="px-14 py-3">{item.code}</td>
                      <td className="px-14 py-3">{item.from}</td>
                      <td className="px-14 py-3">{item.to}</td>
                      <td className="px-14 py-3">{item.driver}</td>
                      <td className="px-14 py-3">{item.date.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CoolersActivity);
