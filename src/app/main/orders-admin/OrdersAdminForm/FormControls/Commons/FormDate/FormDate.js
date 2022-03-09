import { ButtonGroup, Divider } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import Field from "../Field/Field";
import { ButtonS, FormDateS, ButtonGroupWrapperS } from "./FormDate.style";
import { useTranslation } from "react-i18next";

const FormDate = () => {
  const [tabSelected, setTabSelected] = useState("soonest");
  const methods = useFormContext();
  const { control, setValue } = methods;
  const { t } = useTranslation("orders-admin");
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
              <b>{t("SOONEST_POSSIBLE")}</b>{" "}
            </div>
            <div className="text-11">
              {t("APPROX_1")}
            </div>
          </ButtonS>
          <ButtonS
            rigth
            selected={tabSelected === "custom"}
            onClick={() => handleChangeTab("custom")}
          >
            <div className="mb-5">
              <b>{t("CUSTOM_DATE")}</b>{" "}
            </div>
            <div className="text-11">{t("SET_CUSTOM")}</div>
          </ButtonS>
        </ButtonGroup>
      </ButtonGroupWrapperS>
      <div>
        {tabSelected === "custom" && (
          <Fragment>
            <div className="mb-40">
              <Field
                labelText={t("DATE_TIME")}
                isRequired
                name="deliveryTime"
                id="deliveryTime"
                type="dateTime"
                minDate={new Date()}
                animateYearScrolling
                minutesStep={30}
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
