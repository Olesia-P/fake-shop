import connectToDatabase from '../../../database/db';
import { Order } from '../../../database/db-model';

export const config = {
  api: {
    externalResolver: true,
  },
};

connectToDatabase();

export default function handler(req, res) {
  const getOrders = () => {
    Order.find()
      .then((orders) => res.status(200).json(orders))
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  const addOrder = () => {
    Order.create(req.body)
      .then((order) =>
        res.status(201).json({ order, message: 'Order is created' }),
      )
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  const deleteAllOrders = () => {
    Order.deleteMany({})
      .then(() => res.status(200).json({ message: 'All orders were deleted' }))
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  switch (req.method) {
    case 'GET':
      getOrders();
      break;
    case 'POST':
      addOrder();
      break;
    case 'DELETE':
      deleteAllOrders();
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
