import axios from "axios";

export default async function handler(req, res) {
  try {
    let config = {
      method: "get",
      url: `https://cms-retailer.pinggo.vn/wp-json/api/promotions`,
    };

    const request = await axios(config);

    return res.status(200).json(request.data);
  } catch (e) {
    return res
      .status(403)
      .json(e?.response?.data?.message || "Lỗi không xác định");
  }
}
