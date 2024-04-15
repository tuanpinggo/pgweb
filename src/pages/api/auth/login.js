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

  try {
    let config = {
      method: "post",
      url: `${API_URL}/auth/login`,
      headers: {
        ClientKey: clientKey,
      },
      data: JSON.parse(decryptWb(req.body)),
    };

    const request = await axios(config);

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    cookies.set(StorageKeys.Token, request?.data?.data?.token, {
      httpOnly: true,
      sameSite: "lax",
      expires: expires,
      maxAge: 86400000 * 7,
    });

    return res.status(200).json("ok");
  } catch (e) {
    return res
      .status(403)
      .json(e?.response?.data?.message || "Lỗi không xác định");
  }
}
