import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Controller } from "react-hook-form";

const InputWithFormControl = ({
  label,
  control,
  name,
  onChange,
  id,
  formControlProps,
  ...otherProps
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <FormControl {...formControlProps}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          {...field}
          label={label}
          id={id}
          onChange={(data) => {
            onChange?.();
            field.onChange(data);
          }}
          aria-describedby={`${name}-helper-text`}
          {...otherProps}
        />
        {!!fieldState?.error && (
          <FormHelperText id={`${name}-helper-text`} error>
            {fieldState?.error?.message}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);

export default InputWithFormControl;
