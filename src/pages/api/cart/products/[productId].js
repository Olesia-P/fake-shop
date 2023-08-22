import { localCart } from "../../../../utils/objects";

export default function handler(req, res) {
  const { productId } = req.query;
  const receivedId = parseInt(productId);

  if (req.method === "GET") {
    const product = localCart.find((it) => it.product.id === receivedId);
    res.status(200).json(product);
  } else if (req.method === "DELETE") {
    const newCart = localCart.filter(
      (it) => it.product.id !== parseInt(productId)
    );
    localCart.length = 0;
    newCart.forEach((element) => localCart.push(element));
    res.status(200).json(localCart);
  }
}
