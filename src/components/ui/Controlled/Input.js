import { TextField, Typography, Stack } from "@mui/material";
import { Controller } from "react-hook-form";

const Input = ({
  id,
  control,
  name,
  onChange,
  inputProps,
  customLabel,
  customLabelProps,
  containerProps,
  ...otherProps
}) => (
  <Controller
    control={control}
    name={name}
    id={id}
    render={({ field, fieldState }) =>
      customLabel ? (
        <Stack {...containerProps}>
          {customLabel && (
            <Typography {...customLabelProps}>{customLabel}</Typography>
          )}
          <TextField
            {...field}
            inputProps={inputProps}
            onChange={(data) => {
              onChange?.(data);
              field.onChange(data);
            }}
            error={!!fieldState?.error}
            helperText={fieldState?.error?.message}
            {...otherProps}
          />
        </Stack>
      ) : (
        <TextField
          {...field}
          inputProps={inputProps}
          onChange={(data) => {
            onChange?.(data);
            field.onChange(data);
          }}
          error={!!fieldState?.error}
          helperText={fieldState?.error?.message}
          {...otherProps}
        />
      )
    }
  />
);

export default Input;
