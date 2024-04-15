import Cookies from "cookies";
import axios from "axios";
import { StorageKeys } from "@/constants/storage-keys";
import { API_URL } from "@/constants";
export default async function Wishlist(req, res) {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== "development",
  });
  const headers = {
    Authorization: `Bearer ${cookies.get(StorageKeys.Token)}`,
    ClientKey: cookies.get(StorageKeys.ClientKey),
    "Content-Type": "application/json",
  };
  try {
    const request = await axios.get(`${API_URL}/wishlist?page=`, {
      headers,
    });
    return res.status(200).json(request.data);
  } catch (e) {
    return res.status(401).json({ status: 401, message: "Unauthenticated." });
  }
}
