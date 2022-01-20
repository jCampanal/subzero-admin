import { ButtonGroup, Divider } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import Field from "../Field/Field";
import { ButtonS, FormDateS, ButtonGroupWrapperS } from "./FormDate.style";

const FormDate = () => {
  const [tabSelected, setTabSelected] = useState("soonest");
  const methods = useFormContext();
  const { control, setValue } = methods;
  const handleChangeTab = (tab) => {
    if (tab === "soonest") {
      const newDate = new Date();
      newDate.setHours(newDate.getHours() + 1);
      newDate.setMinutes(newDate.getMinutes() + 30);
      setValue("deliveryTime", newDate);
    }
    setTabSelected(tab);
  };
  return (
    <FormDateS>
      <ButtonGroupWrapperS>
        <ButtonGroup>
          <ButtonS
            left
            selected={tabSelected === "soonest"}
            onClick={() => handleChangeTab("soonest")}
          >
            <div className="mb-5">
              <b>Soonest possible</b>{" "}
            </div>
            <div className="text-11">
              Approx 1 hour after your order is placed
            </div>
          </ButtonS>
          <ButtonS
            rigth
            selected={tabSelected === "custom"}
            onClick={() => handleChangeTab("custom")}
          >
            <div className="mb-5">
              <b>Custom date</b>{" "}
            </div>
            <div className="text-11">Set a custom date for your order</div>
          </ButtonS>
        </ButtonGroup>
      </ButtonGroupWrapperS>
      <div>
        {tabSelected === "custom" && (
          <Fragment>
            <div className="mb-40">
              <Field
                labelText="DateTime"
                isRequired
                name="deliveryTime"
                id="deliveryTime"
                type="dateTime"
                control={control}
              />
            </div>
            <Divider />
          </Fragment>
        )}
      </div>
    </FormDateS>
  );
};

export default FormDate;
