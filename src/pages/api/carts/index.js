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
  const getAllCarts = () => {
    Cart.find()
      .then((carts) => res.status(200).json(carts))
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  const createEmptyCart = () => {
    const { userId } = req.body;
    Cart.findOne({ userId })
      .then((cart) => {
        if (!cart) {
          // If cart doesn't exist, create a new one
          const newCart = new Cart({ userId, products: [] });
          return newCart.save();
        }

        return cart;
      })
      .then((updatedCart) => {
        if (!updatedCart) {
          // Respond with 404 if the cart is not found
          res.status(404).json({ error: 'Cart not found' });
        } else {
          res.status(200).json(updatedCart);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };

  const addProductToCart = () => {
    const { userId, item } = req.body;

    Cart.findOne({ userId })
      .then((cart) => {
        // Check if the item with the same id is already in the cart
        const existingItem = cart.products.find(
          (cartItem) => cartItem.info.id === item.info.id,
        );

        if (existingItem) {
          // If item already exists in the cart, increment the quantity by 1
          existingItem.quantity += 1;
        } else {
          // If item doesn't exist in the cart, add it to the products array
          cart.products.push(item);
        }

        return cart.save();
      })
      .then((updatedCart) => {
        if (!updatedCart) {
          // Respond with 404 if the cart is not found
          res.status(404).json({ error: 'Cart not found' });
        } else {
          res.status(200).json(updatedCart);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };

  const deleteAllCarts = () => {
    Cart.deleteMany({})
      .then(() => res.status(200).json({ message: 'All carts were deleted' }))
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  switch (req.method) {
    case 'GET':
      getAllCarts();
      break;
    case 'POST':
      createEmptyCart();
      break;
    case 'PUT':
      addProductToCart();
      break;
    case 'DELETE':
      deleteAllCarts();
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
