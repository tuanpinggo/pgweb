import { IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const NumericInput = ({
  control,
  name,
  onChange,
  hasButton,
  containerProps,
  size,
  min = 1,
  ...otherProps
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <Stack direction={"row"} {...containerProps}>
        <IconButton
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "4px 0px 0px 4px",
            padding: size === "small" ? "0" : "3px 8px",
            border: "1px solid rgba(0,0,0,0.23)",
            ":hover": {
              borderColor: "rgba(0,0,0,0.23)",
            },
            minWidth: size === "small" ? "unset" : "40px",
            borderRight: size === "small" && "none",
          }}
          onClick={() => {
            const value = Number(field?.value);
            if (value > min) {
              onChange?.(value - 1);
              field.onChange(value - 1);
            }
          }}
          disabled={Number(field?.value) === min}
          color="primary"
        >
          <RemoveOutlinedIcon
            {...(Number(field?.value) > min && { color: "primary" })}
          />
        </IconButton>
        <TextField
          {...field}
          size="small"
          sx={{
            maxWidth: size === "small" ? "50px" : "80px",
          }}
          InputProps={{
            sx: {
              borderRadius: "0",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(0,0,0,0.23) !important",
                borderWidth: "1px !important",
                borderLeft: "none",
                borderRight: "none",
              },
            },
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]",
            style: {
              textAlign: "center",
              ...(size === "small" && {
                padding: "4px 0px 5px",
              }),
            },
          }}
          onChange={(event) => {
            if (Number(event.target.value) > min) {
              onChange?.(event);
              field.onChange(event);
            }
          }}
          error={!!fieldState?.error}
          helperText={fieldState?.error?.message}
          {...otherProps}
        />
        <IconButton
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "0px 4px 4px 0px",
            border: "1px solid rgba(0,0,0,0.23)",
            padding: size === "small" ? "0" : "3px 8px",
            ":hover": {
              borderColor: "rgba(0,0,0,0.23)",
            },
            minWidth: size === "small" ? "unset" : "40px",
            borderLeft: size === "small" && "none",
          }}
          onClick={() => {
            const value = Number(field?.value);
            onChange?.(value + 1);
            field.onChange(value + 1);
          }}
          color="primary"
        >
          <AddOutlinedIcon color="primary" />
        </IconButton>
      </Stack>
    )}
  />
);

export default NumericInput;
