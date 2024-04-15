import { API_URL } from "@/constants";
import { StorageKeys } from "@/constants/storage-keys";
import axios from "axios";
import Cookies from "cookies";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== "development",
  });

  // lay clientKey
  const Client_key = cookies.get(StorageKeys.ClientKey);
  const clientKey = !!Client_key ? Client_key : "robot";

  try {
    let config = {
      method: "get",
      url: `${API_URL}/brands`,
      headers: {
        ClientKey: clientKey,
      },
      params: req.query,
    };

    const request = await axios(config);

    return res.status(200).json(request.data);
  } catch (e) {
    return res
      .status(403)
      .json(e?.response?.data?.message || "Lỗi không xác định");
  }
}
