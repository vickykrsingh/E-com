import { instance } from "../server.js";
import crypto from "crypto";
import OrderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

export const checkoutController = async (req, res) => {
  var options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).send({
    success: true,
    order,
  });
};

export const paymentVerification = (req, res) => {
  const { payment_id, order_id, signature, cart , tot } = req.body;

  const body = order_id + "|" + payment_id;

  const userId = req.user._id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", signature);
  console.log("sig generated ", expectedSignature);

  const orderController = async () => {
    try {
      const userOrder = await new OrderModel({
        products: cart,
        payment_id: payment_id,
        order_id: order_id,
        signature: signature,
        totalPrice:tot,
        buyer:userId
      }).save();
      await cartModel.deleteMany({})
      return userOrder;
    }catch(error){
      console.log(error);
    }
  };
  if(signature===expectedSignature){
    const userOrder = orderController()
    res.status(200).send({
      success:true,
      userOrder
    })
  }else{
    res.status(205).send({
      success:false,
      message:"Unauthorized Order"
    })
  }
};



export const userOrderController = async (req,res) => {
  try {
    const orders = await OrderModel.find({buyer:req.user._id})
    res.status(200).send({
      success:true,
      message:"Your all orders",
      orders,
    })
  } catch (error) {
    console.log(error);
    res.status(205).send({
      success:false,
      message:"Error while fetching Your all orders",
      error,
    })
  }
}