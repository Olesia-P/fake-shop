import { localCart } from "../../../utils/objects";
import Axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(localCart);
  } else if (req.method === "POST") {
    const externalApiResponse = await Axios.get(
      `https://fakestoreapi.com/products/${req.body.id}`
    );
    const specifiedProduct = externalApiResponse.data;

    const identicalObject = localCart.find(
      (it) => it.product.id === req.body.id
    );

    req.body.id === identicalObject?.product.id
      ? ((localCart.find((it) => it.product.id === req.body.id).quantity =
          req.body.quantity),
        (localCart.find((it) => it.product.id === req.body.id).product =
          specifiedProduct))
      : localCart.push({
          product: specifiedProduct,
          quantity: req.body.quantity,
        });
    res.status(200).json(localCart);
  }
}
