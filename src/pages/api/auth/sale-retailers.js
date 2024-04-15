import { API_URL } from "@/constants";
import { StorageKeys } from "@/constants/storage-keys";
import axios from "axios";
import Cookies from "cookies";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== "development",
  });

  const Client_key = cookies.get(StorageKeys.ClientKey);

  let clientKey = !!Client_key ? Client_key : "robot";

  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${API_URL}/sale-retailers`,
    headers: {
      ClientKey: clientKey,
      "anonymous-key": "25c07bd7ec1b983a6ccf28b8ed4bcffd",
    },
  };

  try {
    const req = await axios(config);
    return res.status(200).json(req.data);
  } catch (e) {
    return res
      .status(403)
      .json(e?.response?.data?.message || "Lỗi không xác định");
  }
}
