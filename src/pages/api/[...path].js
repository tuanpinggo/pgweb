import { API_URL } from "@/constants";
import { StorageKeys } from "@/constants/storage-keys";
import axios from "axios";
import Cookies from "cookies";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== "development",
  });

  const token = cookies.get(StorageKeys.Token);
  const Client_key = cookies.get(StorageKeys.ClientKey);
  const { path } = req.query;

  const isPublic = !!path?.includes("public");

  if (!token && !isPublic)
    return res.status(403).json("hết phiên làm việc, vui lòng f5 trang");

  let clientKey = !!Client_key ? Client_key : "robot";

  const url = !isPublic ? req.url.slice(5) : req.url.slice(12);

  let config = {
    method: req.method,
    maxBodyLength: Infinity,
    url: `${API_URL}/${url}`,
    headers: {
      ClientKey: clientKey,
      ...(!isPublic && {
        Authorization: `Bearer ${token}`,
      }),
    },
    data: JSON.stringify(req.body),
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
