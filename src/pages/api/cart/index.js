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

// res.status(200).json(req.body);
// const identicalObject = localCart.find(
//   (it) => it.product.id === req.body.object.id
// );

// req.body.object.id === identicalObject?.product.id
//   ? (localCart.find(
//       (it) => it.product.id === req.body.object.id
//     ).quantity = identicalObject.quantity + 1)
//   : localCart.push({
//       product: req.body.object,
//       quantity: 1,
//     });
// } else if (req.body.type === "plusQuantity") {
//   const receivedId = req.body.object.product.id;
//   localCart.find((it) => it.product.id === receivedId).quantity =
//     localCart.find((it) => it.product.id === receivedId).quantity + 1;
// } else if (req.body.type === "minusQuantity") {
//   const receivedId = req.body.object.product.id;
//   localCart.find((it) => it.product.id === receivedId).quantity > 1
//     ? (localCart.find((it) => it.product.id === receivedId).quantity =
//         localCart.find((it) => it.product.id === receivedId).quantity - 1)
//     : 1;
// }
