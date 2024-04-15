import { Controller } from "react-hook-form";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import vi from "date-fns/locale/vi";
import { FormHelperText } from "@mui/material";

const DatePicker = ({
  control,
  name,
  onChange,
  formControlProps,
  label,
  defaultValue,
  placeholder,
  ...otherProps
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl {...formControlProps}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocal={vi}>
            <MUIDatePicker
              {...field}
              label={label}
              onChange={(date, context) => {
                onChange?.(date);
                field?.onChange(date);
              }}
              open={openDatePicker}
              onOpen={() => setOpenDatePicker(true)}
              onClose={() => setOpenDatePicker(false)}
              slotProps={{
                textField: {
                  onClick: () => setOpenDatePicker(true),
                  readOnly: true,
                  placeholder,
                },
                layout: {
                  sx: {
                    ".MuiDayCalendar-weekDayLabel": {
                      margin: 0,
                    },
                  },
                },
              }}
              {...otherProps}
            />
            {!!fieldState?.error && (
              <FormHelperText sx={{ color: "#CF0026" }}>
                {fieldState?.error?.message}
              </FormHelperText>
            )}
          </LocalizationProvider>
        </FormControl>
      )}
    />
  );
};

export default DatePicker;
