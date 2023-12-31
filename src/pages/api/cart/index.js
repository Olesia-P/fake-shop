import Axios from 'axios';
import { localCart } from '../../../utils/objects';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(localCart);
  } else if (req.method === 'POST') {
    const identicalObject = localCart.find(
      (it) => it.product.id === req.body.id,
    );

    if (identicalObject) {
      localCart.find((it) => it.product.id === req.body.id).quantity =
        req.body.quantity;
    } else if (req.body === 'clean-cart') {
      localCart.length = 0;
    } else {
      const externalApiResponse = await Axios.get(
        `https://fakestoreapi.com/products/${req.body.id}`,
      );
      const specifiedProduct = externalApiResponse.data;
      localCart.push({
        product: specifiedProduct,
        quantity: req.body.quantity,
      });
    }

    res.status(200).json(localCart);
  }
}
