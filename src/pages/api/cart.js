// import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
//  const cart = useSelector(({ cart }) => cart);

import { localCart } from "../../utils/objects";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(localCart);
  } else if (req.method === "POST") {
    res.status(200).json(req.body);
    const newCart = req.body;
    localCart.push(newCart);
  }
}
