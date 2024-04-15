import axios from "axios";
import { StorageKeys } from "@/constants/storage-keys";
import Cookies from "cookies";
import { API_URL } from "@/constants";
import { decryptWb } from "@/ultils/crypto";

export default async function forgotPassword(req, res) {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== "development",
  });

  const Client_key = cookies.get(StorageKeys.ClientKey);
  const clientKey = !!Client_key ? Client_key : "robot";

  const parsed = JSON.parse(decryptWb(req.body));

  let config = {
    method: "post",
    url: `${API_URL}/auth/forgot-password`,
    headers: { ClientKey: clientKey, "Content-Type": "application/json" },
    data: { ...parsed },
  };
  try {
    const request = await axios(config);
    return res.status(200).json(request?.data);
  } catch (error) {
    return res
      .status(Number(e?.response?.data?.status) || 403)
      .json(e?.response?.data?.message || "Lỗi không xác định");
  }
}
