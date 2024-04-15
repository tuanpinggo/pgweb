import React from "react";
import { TextField, Autocomplete, Checkbox } from "@mui/material";
import useSWR from "swr";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const AutoCompleteWithSWR = ({
  onChange,
  autoCompleteProps,
  placeholder,
  APIUrl,
  id,
  ...otherProps
}) => {
  const { data, isLoading } = useSWR(APIUrl, {
    dedupingInterval: 1000 * 60 * 60 * 24,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  const Options = data?.data || [];

  return (
    <Autocomplete
      multiple
      id={id}
      options={Options}
      getOptionLabel={(option) => option?.name}
      onChange={onChange}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option?.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField placeholder={placeholder} {...params} {...otherProps} />
      )}
      disableCloseOnSelect
      loading={isLoading}
      {...autoCompleteProps}
    />
  );
};

export default AutoCompleteWithSWR;
