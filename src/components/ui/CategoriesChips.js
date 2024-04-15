import React, { useState } from "react";
import { Chip, Stack } from "@mui/material";
import useSWR from "swr";
import pull from "lodash/pull";
import Skeleton from "@mui/material/Skeleton";

const CategoriesChips = ({ onChange, ...otherProps }) => {
  const { data, isLoading } = useSWR("/public/categories", {
    dedupingInterval: 1000 * 60 * 60 * 24,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  const [selected, setSelected] = useState([]);

  const handleChange = (value) => {
    const temp = selected;
    if (temp.includes(value)) {
      pull(temp, value);
    } else {
      temp.push(value);
    }

    setSelected([...temp]);

    onChange?.([...temp]);
  };

  return (
    <Stack display={"flex"} flexDirection={"row"} gap={2} flexWrap={"wrap"}>
      {isLoading && <Skeleton variant="text" sx={{ height: 32, width: 400 }} />}
      {data?.data.map((item) => (
        <Chip
          variant={selected?.includes(item) ? "filled" : "outlined"}
          color={selected?.includes(item) ? "success" : "default"}
          key={item?.id}
          label={item?.name}
          onClick={() => handleChange(item)}
        />
      ))}
    </Stack>
  );
};

export default CategoriesChips;
