import { MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Field from "../Field/Field";
import { CustomerFormS } from "./CustomerForm.style";
import PropTypes from "prop-types";

const customersDummy = [
  {
    company: {
      id: "67b6e540-098asd5-49e2-8a7a-3af8278f6e2e",
      name: "Company 1",
      address: {
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        street: "Wall Street",
        city: "New York",
        state: "New York",
        zipCode: 10001,
      },
    },
    email: "test@admin.com",
    id: "67b6e540-0erter985-49e2-8a7a-3af8278f6e2e",
    imageURL: "url",
    lastName: "Pérez",
    listID: "80000002-1636062834",
    name: "Juan",
    phoneNumber: "test@admin.com",
    priorityCustomer: false,
    userName: "Juan",
  },
  {
    company: {
      id: "67b6e540-asd-49e2-8a7a-3af5468278f6e2e",
      name: "Company 1",
      address: {
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        street: "Wall Street",
        city: "New York",
        state: "New York",
        zipCode: 10001,
      },
    },
    email: "test@admin.com",
    id: "67b6e540-098ert5-49e2-8rtya7a-3af8278f6e2e",
    imageURL: "url",
    lastName: "Pérez",
    listID: "80000002-1636062834",
    name: "Juan",
    phoneNumber: "test@admin.com",
    priorityCustomer: false,
    userName: "Juan",
  },
  {
    company: {
      id: "67b6e540-asd0985-49e2-8a7a-3af8278f6qweqwee2e",
      name: "Company 1",
      address: {
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        street: "Wall Street",
        city: "New York",
        state: "New York",
        zipCode: 10001,
      },
    },
    email: "test@admin.com",
    id: "67b6e540-0985-49e2-8ra7a-3af8278f2134fwe6e2e",
    imageURL: "url",
    lastName: "Pérez",
    listID: "80000002-1636062834",
    name: "Juan",
    phoneNumber: "test@admin.com",
    priorityCustomer: false,
    userName: "Juan",
  },
  {
    company: {
      id: "67b6e540-098sad5-49e2ert-8a7a-3af8278f6e2e",
      name: "Company 1",
      address: {
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        street: "Wall Street",
        city: "New York",
        state: "New York",
        zipCode: 10001,
      },
    },
    email: "test@admin.com",
    id: "67b6e540-0985-49e2-8a7a-334fdjjuyaf8278f6e2e",
    imageURL: "url",
    lastName: "Pérez",
    listID: "80000002-1636062834",
    name: "Juan",
    phoneNumber: "test@admin.com",
    priorityCustomer: false,
    userName: "Juan",
  },
];

const CustomerForm = (/* { customers } */) => {
  const methods = useFormContext();
  const { control } = methods;
  //   const { errors } = formState;

  const [selectedCustomer, setSelectedCustomer] = useState();
  const customers = customersDummy;

  const handleChangeCustomer = (customerID) => {
    const slectedCustomer = customers.find((c) => c.id === customerID);
    setSelectedCustomer(slectedCustomer);
  };
  return (
    <CustomerFormS>
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Field
          type="select"
          id="user"
          labelText="User"
          name="customerId"
          isRequired
          onChange={handleChangeCustomer}
          control={control}
          options={customers.map((customer) => {
            return (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            );
          })}
        />
        <Field
          type="select"
          id="Shipping"
          labelText="Shipping address"
          isRequired
          name="shipping"
          value={selectedCustomer?.company.address.id || ""}
          options={
            selectedCustomer
              ? [
                  <MenuItem
                    value={selectedCustomer.company.address.id}
                    key={selectedCustomer.company.id}
                  >
                    {selectedCustomer.company.address.street},{" "}
                    {selectedCustomer.company.address.city},{" "}
                    {selectedCustomer.company.address.state},{" "}
                    {selectedCustomer.company.address.zipCode}
                  </MenuItem>,
                ]
              : []
          }
        />
      </div>
    </CustomerFormS>
  );
};

export default CustomerForm;

CustomerForm.propTypes = {
  customers: PropTypes.array.isRequired,
};
