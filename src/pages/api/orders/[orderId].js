// import mongoose from 'mongoose';
import connectToDatabase from '../../../database/db';
import { Order } from '../../../database/db-model';

export const config = {
  api: {
    externalResolver: true,
  },
};

connectToDatabase();

export default function handler(req, res) {
  const { orderId } = req.query;

  const getOrder = () => {
    if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
      Order.findById(orderId)
        .then((order) => {
          if (order) {
            res.status(200).json(order);
          } else {
            res.status(404).json({ message: `Order ${orderId} not found` });
          }
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    } else {
      res.status(404).json({ message: `Order ${orderId} not found` });
    }
  };

  const updateOrder = () => {
    Order.findByIdAndUpdate(orderId, req.body, { new: true })
      .then((order) => {
        if (order) {
          res.status(200).json(order);
        } else {
          res.status(404).json({ message: 'Order not found' });
        }
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  const deleteOrder = () => {
    Order.findByIdAndDelete(orderId)
      .then((order) => {
        if (order) {
          res.status(200).json({ message: `Order ${orderId} was deleted` });
        } else {
          res.status(404).json({ message: 'Order not found' });
        }
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  switch (req.method) {
    case 'GET':
      getOrder();
      break;
    case 'PUT':
      updateOrder();
      break;
    case 'DELETE':
      deleteOrder();
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
