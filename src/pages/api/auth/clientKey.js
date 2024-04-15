import { decryptWb } from "@/ultils/crypto";
import { StorageKeys } from "@/constants/storage-keys";
import axios from "axios";
import Cookies from "cookies";
import { API_URL } from "@/constants";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== "development",
  });

  const Client_key = cookies.get(StorageKeys.ClientKey);
  if (!!Client_key) {
    return res.status(200).json("Already existed.");
  }
  try {
    let config = {
      method: "post",
      url: `${API_URL}/auth/register-device`,
      data: {
        platform: "desktop",
        name: null,
      },
    };

    const request = await axios(config);

    cookies.set(StorageKeys.ClientKey, request?.data?.data?.client_key);

    return res.status(200).json("ok");
  } catch (e) {
    return res
      .status(403)
      .json(e?.response?.data?.message || "Lỗi không xác định");
  }
}
