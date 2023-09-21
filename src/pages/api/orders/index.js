import { localCart } from "../../../utils/objects";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(res.data);
  } else if (req.method === "POST") {
    localCart.length = 0;
    res.status(200).json(req.body);
  }
}
