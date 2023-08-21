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

// else if (req.method === "POST") {
//   const identicalObject = localCart.find(
//     (it) => it.product.id === receivedId
//   );

//   const specifiedProduct = allProducts.find(
//     (it) => it.product.id === receivedId
//   );

//   receivedId === identicalObject?.product.id
//     ? ((localCart.find((it) => it.product.id === req.body.id).quantity =
//         req.body.quantity),
//       (localCart.find((it) => it.product.id === req.body.id).product =
//         specifiedProduct))
//     : localCart.push({
//         product: specifiedProduct,
//         quantity: req.body.quantity,
//       });
//   res.status(200).json(localCart);
// }

// Axios.get("https://fakestoreapi.com/products").then((res) => {
//   allProducts.push(res.data);
//   console.log("allProducts", allProducts);
// });

//  fetch("https://fakestoreapi.com/products")
//    .then((res) => res.json)
//    .then((data) => allProducts.push(data));
//  console.log(allProducts);
