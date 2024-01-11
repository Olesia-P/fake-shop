import connectToDatabase from '../../../database/db';
import { Cart } from '../../../database/db-model';

export const config = {
  api: {
    externalResolver: true,
  },
};
connectToDatabase();

export default function handler(req, res) {
  const getAllCarts = () => {
    Cart.find()
      .then((carts) => res.status(200).json(carts))
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  const addProductToCartOrCreateCart = () => {
    const { userId, item } = req.body;
    Cart.findOne({ userId })
      .then((cart) => {
        if (!cart) {
          // If cart doesn't exist, create a new one
          const newCart = new Cart({ userId, products: [item] });
          return newCart.save();
        }

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

        // Return the promise here, allowing the next 'then' block to handle the response
        return cart.save();
      })
      .then((updatedCart) => {
        res.status(200).json(updatedCart);
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
      addProductToCartOrCreateCart();
      break;
    case 'DELETE':
      deleteAllCarts();
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
