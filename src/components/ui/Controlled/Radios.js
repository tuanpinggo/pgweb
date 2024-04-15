import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

const Radios = ({
  name,
  control,
  options,
  renderLabel,
  getChecked,
  onChange,
  containerProps,
  ...props
}) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <>
          <RadioGroup
            aria-label={name}
            {...field}
            onChange={(_, value) => {
              field?.onChange(value);
              onChange?.(value);
            }}
            {...containerProps}
          >
            {options?.map((item) => {
              return (
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  checked={getChecked?.(item)}
                  control={<Radio />}
                  label={renderLabel?.(item)}
                  sx={{
                    my: "8px",
                  }}
                  {...props}
                />
              );
            })}
          </RadioGroup>
          {!!fieldState?.error && (
            <FormHelperText sx={{ mt: "-10px", color: "#CF0026" }}>
              {fieldState?.error?.message}
            </FormHelperText>
          )}
        </>
      )}
      name={name}
      control={control}
    />
  );
};

export default Radios;
