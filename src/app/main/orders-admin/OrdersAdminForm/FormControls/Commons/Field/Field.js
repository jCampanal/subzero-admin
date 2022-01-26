import {
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
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
  noValue,
  helperText,
  hidden,
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
                    id={id}
                    variant="outlined"
                    required={isRequired}
                    onChange={(e) => {
                      if (onChange) {
                        onChange(e.target.value);
                      }
                      field.onChange(e);
                    }}
                  >
                    {noValue && (
                      <MenuItem key="null" value={noValue}>
                        {noValue === "" ? "Nothing to select" : noValue}
                      </MenuItem>
                    )}
                    {options}
                  </Select>
                );
              }}
            />
          ) : (
            <Select
              {...props}
              name={name}
              id={id}
              variant="outlined"
              onChange={(e) => onChange(e.target.value)}
              required={isRequired}
            >
              {noValue && (
                <MenuItem key="null" value="">
                  {noValue}
                </MenuItem>
              )}
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
                  id={id}
                  helperText={helperText}
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
              id={id}
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
                  id={id}
                  required={isRequired}
                  helperText={helperText}
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
              id={id}
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
                  helperText={helperText}
                  id={id}
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
              id={id}
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
                  id={id}
                  helperText={helperText}
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
              id={id}
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
    <FieldS hidden={hidden}>
      <LabelS htmlFor={id}>
        {labelText} {isRequired && <span>(Required)</span>}
      </LabelS>

      {field}
      {helperText && type === "select" && (
        <FormHelperText error={props.error}>{helperText}</FormHelperText>
      )}
    </FieldS>
  );
};

export default Field;

Field.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  noValue: PropTypes.string,
  error: PropTypes.bool,
  hidden: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  options: PropTypes.array,
  control: PropTypes.object,
  onChange: PropTypes.func,
};
