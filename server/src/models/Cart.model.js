import { Schema, model } from "mongoose";

const CartModel = Schema({
  userId: { type: Number, required: true },
  items: [
    {
      productId: { type: String, required: true },
      price: { type: Number, required: true },
      name: { type: String, required: true },
      img: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default model("Cart", CartModel);
