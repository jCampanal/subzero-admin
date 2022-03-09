import React, { Fragment, useEffect, useState } from "react";
import {
  DayButtonsWrapperS,
  LabelS,
  TimeSectionS,
  WeeklyButtonS,
  DayButtonsS,
  TextS,
  ButtonS,
  ButtonGroupWrapperS,
} from "./TimeSection.style";
import { AccessTime, ThumbUp } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import {
  ButtonGroup,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import Field from "../Field/Field";
import { useDispatch, useSelector } from "react-redux";
import { selectCancelStatus } from "app/store/oredersAdmin/ordersAdminSlice";
const TimeSection = () => {
  const [showDays, setShowDays] = useState(false);
  const [days, setDays] = useState([]);
  const methods = useFormContext();
  const { control, setValue, formState } = methods;
  const { errors } = formState;
  const dispatch = useDispatch();
  const cancelForm = useSelector(selectCancelStatus);
  const { t } = useTranslation("orders-admin");

  const orderRepeted = days.length > 0;
  const toggleDays = () => {
    setShowDays(!showDays);
  };
  const handleSelectDay = (dayNumber) => {
    let newDays = [...days];
    if (
      newDays.findIndex((day) => {
        return day === dayNumber;
      }) >= 0
    ) {
      const index = newDays.indexOf(dayNumber);
      if (index > -1) {
        newDays.splice(index, 1);
      }
    } else {
      newDays = [...days, dayNumber];
    }
    setDays(newDays);
  };

  useEffect(() => {
    setValue("daysToOrder", days);
  }, [days, setValue]);

  useEffect(() => {
    if (cancelForm) {
      setDays([]);
    }
  }, [cancelForm]);
  return (
    <TimeSectionS>
      <LabelS>
        {t("TO_REPET")} <span> (Optional)</span>
      </LabelS>

      <WeeklyButtonS onClick={toggleDays} orderRepeted={orderRepeted}>
        {!orderRepeted && (
          <Fragment>
            <AccessTime className="mr-5" />{t("WEEKLY_REPET")}
          </Fragment>
        )}

        {orderRepeted && (
          <Fragment>
            {t("ORDER_REPEATED")}
            <ThumbUp className="ml-5" />
          </Fragment>
        )}
      </WeeklyButtonS>

      <Collapse in={showDays}>
        <DayButtonsWrapperS>
          <TextS>
          {t("SELECT_DAYS")}
          </TextS>
          <DayButtonsS>
            <ButtonGroupWrapperS>
              <ButtonGroup>
                <ButtonS
                  radius="left"
                  onClick={() => handleSelectDay(2)}
                  selected={
                    days.findIndex((day) => {
                      return day === 2;
                    }) >= 0
                  }
                >
                  {t("MONDAY")}
                </ButtonS>
                <ButtonS
                  onClick={() => handleSelectDay(3)}
                  selected={
                    days.findIndex((day) => {
                      return day === 3;
                    }) >= 0
                  }
                >
                  {t("TUESDAY")}
                </ButtonS>
                <ButtonS
                  radius="right"
                  onClick={() => handleSelectDay(4)}
                  selected={
                    days.findIndex((day) => {
                      return day === 4;
                    }) >= 0
                  }
                >
                  {t("WEDNESDAY")}
                </ButtonS>
              </ButtonGroup>
            </ButtonGroupWrapperS>
            <ButtonGroupWrapperS>
              <ButtonGroup>
                <ButtonS
                  radius="left"
                  onClick={() => handleSelectDay(5)}
                  selected={
                    days.findIndex((day) => {
                      return day === 5;
                    }) >= 0
                  }
                >
                  {t("THURSDAY")}
                </ButtonS>
                <ButtonS
                  onClick={() => handleSelectDay(6)}
                  selected={
                    days.findIndex((day) => {
                      return day === 6;
                    }) >= 0
                  }
                >
                 {t ("FRIDAY")}
                </ButtonS>
                <ButtonS
                  radius="right"
                  onClick={() => handleSelectDay(7)}
                  selected={
                    days.findIndex((day) => {
                      return day === 7;
                    }) >= 0
                  }
                >
                  {t("SATURDAY")}
                </ButtonS>
              </ButtonGroup>
            </ButtonGroupWrapperS>
            <ButtonGroupWrapperS>
              <ButtonS
                radius="both"
                onClick={() => handleSelectDay(1)}
                selected={
                  days.findIndex((day) => {
                    return day === 1;
                  }) >= 0
                }
              >
                {t("SUNDAY")}
              </ButtonS>
            </ButtonGroupWrapperS>
          </DayButtonsS>
        </DayButtonsWrapperS>
        <Divider />
      </Collapse>

      <Controller
        name="pickUp"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            className="mt-8 mb-16"
            id="pickUp"
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={<span style={{ fontSize: "16px" }}>{t("PICK_UP")}</span>}
          />
        )}
      />
      <Field
        type="text"
        control={control}
        name="poNo"
        id="poNo"
        labelText="Reference #"
        error={!!errors.poNo}
        helperText={errors?.poNo?.message}
      />
    </TimeSectionS>
  );
};

export default TimeSection;
