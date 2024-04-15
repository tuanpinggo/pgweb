import Cookies from "cookies";
import axios from "axios";
import { StorageKeys } from "@/constants/storage-keys";
import { API_URL } from "@/constants";

export default async function handler(req, res) {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== "development",
  });
  const token = cookies.get(StorageKeys.Token);

  if (!token) {
    return res.status(403).json({ status: 403, message: "Unauthenticated." });
  }
  const Client_key = cookies.get(StorageKeys.ClientKey);
  let clientKey = !!Client_key ? Client_key : "robot";

  const headers = {
    Authorization: `Bearer ${token}`,
    ClientKey: clientKey,
  };

  let config = {
    method: "post",
    url: `${API_URL}/sales/${req.body.id}/update-status`,
    headers: headers,
    data: req.body.data,
  };
  try {
    const request = await axios(config);
    return res.status(200).json(request.data);
  } catch (error) {
    if (error.response && error.response.data) {
      return res.status(400).json(error.response.data);
    } else {
      return res.status(400).json(error.message);
    }
  }
}
