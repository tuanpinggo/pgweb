import { decryptWb } from "@/ultils/crypto";
import { StorageKeys } from "@/constants/storage-keys";
import axios from "axios";
import Cookies from "cookies";
import { API_URL } from "@/constants";

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

  // lay clientKey
  const Client_key = cookies.get(StorageKeys.ClientKey);
  const clientKey = !!Client_key ? Client_key : "robot";

  const parsed = JSON.parse(decryptWb(req.body));

  const phone = parsed?.phone;

  try {
    let config = {
      method: "post",
      url: `${API_URL}/auth/check-phone-exist/${phone}`,
      headers: {
        ClientKey: clientKey,
      },
    };

    const request = await axios(config);
    return res.status(200).json(request?.data);
  } catch (e) {
    return res
      .status(403)
      .json(e?.response?.data?.message || "Lỗi không xác định");
  }
}
