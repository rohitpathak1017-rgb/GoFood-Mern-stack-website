const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');  

// Import the Order model

router.post('/orderdata', async (req, res) => {
  try {
    let data = req.body.order_data;

    if (!Array.isArray(data)) {
      return res.status(400).json({ success: false });
    }

    data.splice(0, 0, { Order_date: req.body.order_date });

    let eId = await Order.findOne({ email: req.body.email });

    if (eId === null) {
      await Order.create({
        email: req.body.email,
        orders: [{ items: data }]   //  FIX
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { orders: { items: data } } } //  FIX
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error("ORDER ERROR ", error.message);
    res.send("Server Error");
  }
});


module.exports = router;