import { localCart } from "../../../../utils/objects";

export default function handler(req, res) {
  const { productId } = req.query;

  if (req.method === "GET") {
    const product = localCart.find(
      (it) => it.product.id === parseInt(productId)
    );
    res.status(200).json(product);
  } else if (req.method === "DELETE") {
    const receivedId = parseInt(productId);
    const newCart = localCart.filter((it) => it.product.id !== receivedId);
    localCart.length = 0;
    newCart.forEach((element) => localCart.push(element));
    res.status(200).json(localCart);
  }
}
