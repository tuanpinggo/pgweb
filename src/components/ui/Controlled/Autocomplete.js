import React from "react";
import {
  Box,
  TextField,
  autocompleteClasses,
  Autocomplete as MUIAutocomplete,
  FormControl,
  FormHelperText,
} from "@mui/material";
import isEqual from "lodash/isEqual";
import { Controller } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

const Autocomplete = ({
  name,
  id,
  control,
  options = [],
  onChange,
  textFieldProps,
  formControlProps,
  loading,
  ...otherProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl {...formControlProps}>
          <MUIAutocomplete
            {...field}
            id={id}
            options={options}
            loading={loading}
            getOptionLabel={(option) => option?.name || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                {...textFieldProps}
                error={!!fieldState?.error}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            renderOption={(props, option, state, ownerState) => (
              <Box
                sx={{
                  margin: "5px",
                  [`&.${autocompleteClasses.option}`]: {
                    padding: "8px",
                  },
                }}
                component="li"
                {...props}
              >
                {ownerState.getOptionLabel(option)}
              </Box>
            )}
            isOptionEqualToValue={(option, value) => isEqual(option, value)}
            onChange={(_, data) => {
              onChange?.(data);
              field.onChange(data);
            }}
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
};
export default Autocomplete;
