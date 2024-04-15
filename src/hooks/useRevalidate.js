import useSWR from "swr";
import { useRouter } from "next/router";
import axios from "axios";

const useRevalidate = () => {
  const { asPath } = useRouter();

  useSWR(["/api/revalidate", asPath], () => {
    axios.post("/api/revalidate", { slug: asPath });
  });
  return null;
};

export default useRevalidate;
