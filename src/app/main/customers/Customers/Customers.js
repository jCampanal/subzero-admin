import { memo } from 'react';
import {Button, Checkbox, FormControlLabel, TextField} from '@material-ui/core';

const dummyCustomers = [
  {
    id: 1,
    email: 'gue@ipsum.com',
    firstName: 'Gue',
    lastName: 'Lorem',
    phone: '235324',
    company: 'Amet Dolor',
  },
  {
    id: 2,
    email: 'gue@ipsum.com',
    firstName: 'Gue',
    lastName: 'Lorem',
    phone: '235324',
    company: 'Amet Dolor',
  },
  {
    id: 3,
    email: 'gue@ipsum.com',
    firstName: 'Gue',
    lastName: 'Lorem',
    phone: '235324',
    company: 'Amet Dolor',
  },
  {
    id: 4,
    email: 'gue@ipsum.com',
    firstName: 'Gue',
    lastName: 'Lorem',
    phone: '235324',
    company: 'Amet Dolor',
  },
  {
    id: 5,
    email: 'gue@ipsum.com',
    firstName: 'Gue',
    lastName: 'Lorem',
    phone: '235324',
    company: 'Amet Dolor',
  },
  {
    id: 6,
    email: 'gue@ipsum.com',
    firstName: 'Gue',
    lastName: 'Lorem',
    phone: '235324',
    company: 'Amet Dolor',
  },
  {
    id: 7,
    email: 'gue@ipsum.com',
    firstName: 'Gue',
    lastName: 'Lorem',
    phone: '235324',
    company: 'Amet Dolor',
  },
  {
    id: 8,
    email: 'gue@ipsum.com',
    firstName: 'Gue',
    lastName: 'Lorem',
    phone: '235324',
    company: 'Amet Dolor',
  },
];

function Customers() {
  return (
    <div>
      <p className="h1">
        <i className="fa fa-user mr-4" />
        Costumers{' '}
        <span className="text-gray-50 rounded-full px-16 bg-blue-600">{dummyCustomers.length}</span>
      </p>
      <div className="flex flex-col my-16 bg-gray-300 border border-gray-400 rounded-lg shadow-md">
        <div className="m-20">
          <p className="h3">Account generator</p>
          <p className="h6">Fill the follow to generate a link for a new customer</p>
        </div>
        <div className="flex flex-wrap justify-start p-20 bg-white">
          <div>
          <TextField label="Company" name="code" className="block" />
            <span className="block text-xs italic mt-2 text-gray-500">Ej.: Company name</span>
          </div>
          <div className="ml-20">
          <TextField label="Mails" name="code" className="block" />
            <span className="block text-xs italic mt-2 text-gray-500">Ej.: user@server.com, user2@server.com,...</span>
          </div>
          <div className="min-w-full mt-12">
            <FormControlLabel
              control={
                <Checkbox />
              }
              label="Send after generate the key"
            />
          </div>
        </div>
        <div className="m-20">
          <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white">
            Search
          </Button>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                  <tr className="text-left tracking-wider border-t border-b">
                    <th scope="col" className="px-14 py-3">
                      #
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-14 py-3">
                      First Name
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyCustomers.map((item) => (
                    <tr key={item.id} className="odd:bg-gray-200 hover:bg-gray-100">
                      <td className="px-14 py-3">{item.id}</td>
                      <td className="px-14 py-3">{item.email}</td>
                      <td className="px-14 py-3">{item.firstName}</td>
                      <td className="px-14 py-3">{item.lastName}</td>
                      <td className="px-14 py-3">{item.phone}</td>
                      <td className="px-14 py-3">{item.company}</td>
                      <td className="px-14 py-3">
                        <div className="flex justify-end items-center">
                          <Button
                            type="button"
                            className="text-sm text-gray-700 hover:text-gray-800 leading-none rounded-md mr-5"
                          >
                            <i className="fa fa-edit mr-4" />
                            Edit
                          </Button>
                          <Button
                            type="button"
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
    </div>
  );
}

export default memo(Customers);
