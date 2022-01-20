import React from "react";
import Field from "../Field/Field";
import { InvitedFormS } from "./InvitedForm.style";

const InvitedForm = () => {
  return (
    <InvitedFormS>
      <Field labelText="Company" name="company" id="company" isRequired />
      <Field labelText="Email" name="email" id="email" isRequired />
      <div className="grid gap-x-48 grid-cols-1 sm:grid-cols-2">
        <Field
          labelText="Street"
          name="street"
          id="street"
          placeholder="Street"
        />
        <Field
          labelText="State"
          name="state"
          id="state"
          placeholder="state"
          type="select"
          options={[]}
        />
        <Field labelText="City" name="city" id="city" placeholder="City" />
        <Field
          labelText="Zip Code"
          name="zipCode"
          id="zipCode"
          placeholder="Zip Code"
        />
      </div>
      <Field labelText="Email" name="email" id="email" isRequired />
    </InvitedFormS>
  );
};

export default InvitedForm;
