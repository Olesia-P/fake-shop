const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  info: {
    id: Number,
    title: String,
    price: String,
    category: String,
    description: String,
    image: String,
  },
  quantity: Number,
});

const CartSchema = new mongoose.Schema({
  userId: Number,
  products: [ItemSchema],
});

const PersonalDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  deliveryAddress: String,
  phoneNumber: mongoose.Schema.Types.Mixed,
  comment: String,
  totalCost: Number,
  productsQuantity: Number,
});

const OrderSchema = new mongoose.Schema({
  cart: CartSchema,
  personalData: PersonalDataSchema,
});

export const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
export const Order =
  mongoose.models.Order || mongoose.model('Order', OrderSchema);
