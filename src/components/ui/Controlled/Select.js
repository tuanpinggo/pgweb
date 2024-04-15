import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  MenuItem,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useRef, useState } from "react";

const Select = ({
  name,
  control,
  options,
  formControlProps,
  id,
  label,
  onChange,
  multiple = false,
  defaultValue,
  disabled,
  inputLabelProps,
  ...otherProps
}) => {
  const firstTimeRef = useRef(true);
  const [value, setValue] = useState(!!multiple ? [] : "");

  useEffect(() => {
    if (options?.length > 0 && !!defaultValue && !!firstTimeRef.current) {
      setValue(defaultValue);
      firstTimeRef.current = false;
    }
  }, [options, defaultValue, firstTimeRef]);

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControl {...formControlProps}>
          <InputLabel htmlFor={id} disabled={disabled} {...inputLabelProps}>
            {label}
          </InputLabel>
          <MUISelect
            id={id}
            label={label}
            {...field}
            value={value}
            onChange={(event) => {
              onChange?.(event.target.value);
              field.onChange(event.target.value);
              setValue(event.target.value);
            }}
            error={!!fieldState?.error}
            MenuProps={{
              disableScrollLock: true,
            }}
            {...(!!otherProps?.loading && {
              IconComponent: () => (
                <CircularProgress
                  sx={{
                    width: "24px !important",
                    height: "24px !important",
                    position: "absolute",
                    right: "10px",
                  }}
                />
              ),
            })}
            multiple={multiple}
            disabled={disabled}
            {...otherProps}
          >
            {options?.map((option, index) => (
              <MenuItem key={index} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </MUISelect>
          {!!fieldState?.error && (
            <FormHelperText id={`${name}-helper-text`} error>
              {fieldState?.error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
      name={name}
      control={control}
    />
  );
};

Select.displayName = "Select";

export default Select;
