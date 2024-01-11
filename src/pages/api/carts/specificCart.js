/* eslint-disable consistent-return */
/* eslint-disable no-console */

import connectToDatabase from '../../../database/db';
import { Cart } from '../../../database/db-model';

export const config = {
  api: {
    externalResolver: true,
  },
};

connectToDatabase();

export default function handler(req, res) {
  const getSpecificCart = () => {
    const { userId } = req.query;
    Cart.findOne({ userId })
      .then((cart) => {
        if (!cart) {
          console.log('Cart not found for userId:', userId);
          return res.status(404).json({ message: 'Cart not found' });
        }

        // const { products } = cart;
        return res.status(200).json(cart);
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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
            console.log('All products deleted successfully.');
            res
              .status(200)
              .json({ message: 'All products deleted successfully' });
          } else {
            console.log('Cart not found for userId:', userId);
            res.status(404).json({ message: 'Cart not found' });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        });
      return;
    }

    Cart.findOne({ userId })
      .then((cart) => {
        if (!cart) {
          console.log('Cart not found for userId:', userId);
          res.status(404).json({ message: 'Cart not found' });
          return;
        }

        const itemIndex = cart.products.findIndex(
          (item) => item.info.id === itemId,
        );

        if (itemIndex === -1) {
          console.log('Item not found in the cart:', itemId);
          res.status(404).json({ message: 'Item not found in the cart' });
          return;
        }
        cart.products.splice(itemIndex, 1);
        // Return the promise here, allowing the next 'then' block to handle the response
        return cart.save();
      })
      .then((updatedCart) => {
        if (updatedCart) {
          console.log('Item deleted successfully.');
          res
            .status(200)
            .json({ message: `Item Id ${itemId} deleted successfully` });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  const decreaseProductQuantity = () => {
    const { userId, itemId } = req.body;

    Cart.findOne({ userId })
      .then((cart) => {
        if (!cart) {
          console.log('Cart not found for userId:', userId);
          res.status(404).json({ message: 'Cart not found' });
          return;
        }

        const product = cart.products.find((item) => item.info.id === itemId);

        if (!product) {
          console.log('Item not found in the cart:', itemId);
          res.status(404).json({ message: 'Item not found in the cart' });
          return;
        }

        if (product.quantity > 1) {
          // If quantity is greater than 1, subtract 1 from the quantity
          product.quantity -= 1;

          // Return the promise here, allowing the next 'then' block to handle the response
          return cart.save();
        }
        console.log('Quantity is already at the minimum.');
        res.status(400).json({ message: 'Quantity is already at the minimum' });
      })
      .then((updatedCart) => {
        if (updatedCart) {
          console.log('Quantity decreased successfully.');
          res.status(200).json({
            message: `Quantity decreased successfully for Item Id ${itemId}`,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  switch (req.method) {
    case 'GET':
      getSpecificCart();
      break;
    case 'PUT':
      decreaseProductQuantity();
      break;
    case 'DELETE':
      deleteProductOrAllProductsInCart();
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
