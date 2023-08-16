// import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
// const cart = useSelector(({ cart }) => cart);

import { testCart } from "../../utils/objects";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(testCart);
  }
  // else if (req.method === "POST") {
  //   const cart = req.body.cart;
  //   const newCart = {
  //     id: Date.now(),
  //     text: ,
  //   };
  //   testCart.push(newCart);
  // }
}
