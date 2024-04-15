import { decryptWb } from "@/ultils/crypto";
import { StorageKeys } from "@/constants/storage-keys";
import axios from "axios";
import Cookies from "cookies";
import { API_URL } from "@/constants";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({
      status: "error",
      statusCode: "01",
      msg: "Request not found",
    });
  }

  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== "development",
  });

  const token = cookies.get(StorageKeys.Token);

  if (!token)
    return res.status(403).json("hết phiên làm việc, vui lòng f5 trang");

  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/auth/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
        ClientKey: "robot",
      },
    };

    await axios(config);

    cookies.set(StorageKeys.Token);

    return res.status(200).json({
      status: "success",
      statusCode: "200",
      msg: "logout success",
    });
  } catch (e) {
    return res
      .status(403)
      .json(e?.response?.data?.message || "Lỗi không xác định");
  }
}
