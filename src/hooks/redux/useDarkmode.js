import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleDarkMode } from "@/store/layoutReducer";
import { StorageKeys } from "@/constants/storage-keys";

const useDarkmode = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.layout.darkMode);

  const setDarkMode = (mode) => {
    dispatch(handleDarkMode(mode));
    localStorage.setItem(StorageKeys.DarkMode, JSON.stringify(mode));
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem(StorageKeys.DarkMode);
    if (storedDarkMode !== null) {
      dispatch(handleDarkMode(JSON.parse(storedDarkMode)));
    }
  }, []);

  return [isDark, setDarkMode];
};

export default useDarkmode;
