import {
  IconButton,
  InputAdornment,
  Select,
  TextField,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { FieldS, LabelS } from "./Field.style";
import PropTypes from "prop-types";
import { DateTimePicker } from "@material-ui/pickers";
import { CalendarToday } from "@material-ui/icons";

const Field = ({
  type = "text",
  id,
  labelText,
  isRequired,
  options,
  control,
  name,
  onChange,
  ...props
}) => {
  let field;
  switch (type) {
    case "select":
      field = (
        <Fragment>
          {control ? (
            <Controller
              name={name}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    {...props}
                    labelId={id}
                    variant="outlined"
                    required={isRequired}
                    onChange={(e) => {
                      if (onChange) {
                        onChange(e.target.value);
                      }
                      field.onChange(e);
                    }}
                  >
                    {options}
                  </Select>
                );
              }}
            />
          ) : (
            <Select
              {...props}
              name={name}
              labelId={id}
              variant="outlined"
              onChange={(e) => onChange(e.target.value)}
              required={isRequired}
            >
              {options}
            </Select>
          )}
        </Fragment>
      );
      break;
    case "text":
      field = (
        <Fragment>
          {control ? (
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  {...props}
                  labelId={id}
                  variant="outlined"
                  required={isRequired}
                  onChange={(e) => {
                    if (onChange) {
                      onChange(e.target.value);
                    }
                    field.onChange(e);
                  }}
                />
              )}
            />
          ) : (
            <TextField
              {...props}
              labelId={id}
              variant="outlined"
              required={isRequired}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
            />
          )}
        </Fragment>
      );
      break;
    case "dateTime":
      field = (
        <Fragment>
          {control ? (
            <Controller
              name="deliveryTime"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  {...props}
                  labelId={id}
                  required={isRequired}
                  rightArrowIcon={<CalendarToday />}
                  inputVariant="outlined"
                  onChange={(e) => {
                    if (onChange) {
                      onChange(e);
                    }
                    field.onChange(e);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <CalendarToday />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          ) : (
            <DateTimePicker
              {...props}
              labelId={id}
              inputVariant="outlined"
              required={isRequired}
              onChange={(e) => {
                if (onChange) {
                  onChange(e);
                }
              }}
              rightArrowIcon={<CalendarToday />}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <CalendarToday />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Fragment>
      );
      break;
    case "number":
      field = (
        <Fragment>
          {control ? (
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  {...props}
                  type="number"
                  labelId={id}
                  variant="outlined"
                  required={isRequired}
                  onChange={(e) => {
                    if (onChange) {
                      onChange(e.target.value);
                    }
                    field.onChange(e);
                  }}
                />
              )}
            />
          ) : (
            <TextField
              {...props}
              labelId={id}
              type="number"
              variant="outlined"
              required={isRequired}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
            />
          )}
        </Fragment>
      );
      break;

    default:
      field = (
        <Fragment>
          {control ? (
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  {...props}
                  labelId={id}
                  variant="outlined"
                  required={isRequired}
                  onChange={(e) => {
                    if (onChange) {
                      onChange(e.target.value);
                    }
                    field.onChange(e);
                  }}
                />
              )}
            />
          ) : (
            <TextField
              {...props}
              labelId={id}
              variant="outlined"
              required={isRequired}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
            />
          )}
        </Fragment>
      );
      break;
  }

  return (
    <FieldS>
      <LabelS htmlFor={id}>
        {labelText} {isRequired && <span>(Required)</span>}
      </LabelS>

      {field}
    </FieldS>
  );
};

export default Field;

Field.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  options: PropTypes.array,
  control: PropTypes.object,
  onChange: PropTypes.func,
};
