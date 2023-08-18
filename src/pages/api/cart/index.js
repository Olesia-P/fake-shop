import { localCart } from "../../../utils/objects";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(localCart);
  } else if (req.method === "POST") {
    res.status(200).json(req.body);

    if (req.body.type === "addToCart") {
      const identicalObject = localCart.find(
        (it) => it.product.id === req.body.object.id
      );
      console.log("identicalObject", identicalObject);
      req.body.object.id === identicalObject?.product.id
        ? (localCart.find(
            (it) => it.product.id === req.body.object.id
          ).quantity = identicalObject.quantity + 1)
        : localCart.push({
            product: req.body.object,
            quantity: 1,
          });
    } else if (req.body.type === "plusQuantity") {
      const receivedId = req.body.object.product.id;
      localCart.find((it) => it.product.id === receivedId).quantity =
        localCart.find((it) => it.product.id === receivedId).quantity + 1;
    } else if (req.body.type === "minusQuantity") {
      const receivedId = req.body.object.product.id;
      localCart.find((it) => it.product.id === receivedId).quantity > 1
        ? (localCart.find((it) => it.product.id === receivedId).quantity =
            localCart.find((it) => it.product.id === receivedId).quantity - 1)
        : 1;
    }
  }
}
