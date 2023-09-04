import { carts } from "../../../utils/objects";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(carts);
  } else if (req.method === "POST") {
    carts.push(req.body);
    res.status(200).json(carts);
  }
}
