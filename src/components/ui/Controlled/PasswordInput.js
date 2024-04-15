import Input from "./Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";

const PasswordInput = ({
  control,
  placeholder,
  id,
  name,
  size = "small",
  fullWidth = true,
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      control={control}
      placeholder={placeholder}
      id={id}
      name={name}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth={fullWidth}
      size={size}
      {...otherProps}
    />
  );
};

export default PasswordInput;
