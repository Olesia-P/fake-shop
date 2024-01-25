/* eslint-disable consistent-return */

import connectToDatabase from '../../../database/db';
import { Cart } from '../../../database/db-model';

export const config = {
  api: {
    externalResolver: true,
  },
};
// to get around the false warning of Next.js 'API resolved without sending a response,
// this may result in stalled requests'

connectToDatabase();

export default function handler(req, res) {
  const getSpecificCart = () => {
    const { userId } = req.query;
    Cart.findOne({ userId })
      .then((cart) => {
        if (!cart) {
          return res
            .status(404)
            .json({ message: `Cart not found for userId: ${userId}` });
        }

        return res.status(200).json(cart);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };

  const deleteProductOrAllProductsInCart = () => {
    const { userId, itemId } = req.body;
    if (!itemId) {
      // If itemId is not present, delete all products in the array
      Cart.findOneAndUpdate(
        { userId },
        { $set: { products: [] } },
        { new: true },
      )
        .then((updatedCart) => {
          if (updatedCart) {
            res
              .status(200)
              .json({ message: 'All products deleted successfully' });
          } else {
            res
              .status(404)
              .json({ message: `Cart not found for userId: ${userId}` });
          }
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
      return;
    }

    Cart.findOne({ userId })
      .then((cart) => {
        if (!cart) {
          res
            .status(404)
            .json({ message: `Cart not found for userId: ${userId}` });
          return;
        }

        const itemIndex = cart.products.findIndex(
          (item) => item.info.id === itemId,
        );

        if (itemIndex === -1) {
          res
            .status(404)
            .json({ message: `Item ${itemId} not found in the cart` });
          return;
        }
        cart.products.splice(itemIndex, 1);

        return cart.save();
      })
      .then((updatedCart) => {
        if (updatedCart) {
          res
            .status(200)
            .json({ message: `Item Id ${itemId} deleted successfully` });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };

  const decreaseProductQuantity = () => {
    const { userId, itemId } = req.body;

    Cart.findOne({ userId })
      .then((cart) => {
        if (!cart) {
          res
            .status(404)
            .json({ message: `Cart not found for userId: ${userId}` });
          return;
        }

        const product = cart.products.find((item) => item.info.id === itemId);

        if (!product) {
          res
            .status(404)
            .json({ message: `Item ${itemId} not found in the cart` });
          return;
        }

        if (product.quantity > 1) {
          // If quantity is greater than 1, subtract 1 from the quantity
          product.quantity -= 1;

          return cart.save();
        }

        res.status(400).json({ message: 'Quantity is already at the minimum' });
      })
      .then((updatedCart) => {
        if (updatedCart) {
          res.status(200).json({
            message: `Quantity decreased successfully for Item Id ${itemId}`,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };

  const deleteSpecificCart = () => {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ error: 'userId is required in the request body' });
    }

    Cart.deleteOne({ userId })
      .then((result) => {
        if (result.deletedCount === 1) {
          return res.status(200).json({ message: 'Cart deleted successfully' });
        }
        return res
          .status(404)
          .json({ error: `Cart not found for the given userId ${userId}` });
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  };

  switch (req.method) {
    case 'GET':
      getSpecificCart();
      break;
    case 'PATCH':
      decreaseProductQuantity();
      break;
    case 'PUT':
      deleteProductOrAllProductsInCart();
      break;
    case 'DELETE':
      deleteSpecificCart();
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
