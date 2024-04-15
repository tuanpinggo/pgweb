import axios from "axios";
import { StorageKeys } from "@/constants/storage-keys";
import Cookies from "cookies";
import { API_URL } from "@/constants";
import { decryptWb } from "@/ultils/crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({
      success: false,
      errorCode: "REQUEST_NOT_FOUND",
      data: {
        msg: "Request not found",
      },
    });
  }

  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== "development",
  });

  const Client_key = cookies.get(StorageKeys.ClientKey);
  const clientKey = !!Client_key ? Client_key : "robot";

  const parsed = JSON.parse(decryptWb(req.body));

  let config = {
    method: "post",
    url: `${API_URL}/auth/register`,
    headers: {
      ClientKey: clientKey,
      "Content-Type": "application/json",
    },
    data: { ...parsed },
  };
  try {
    const request = await axios(config);
    res.status(200).json(request.data);
  } catch (error) {
    return res
      .status(403)
      .json(e?.response?.data?.message || "Lỗi không xác định");
  }
}
