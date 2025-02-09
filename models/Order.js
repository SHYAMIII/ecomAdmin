const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        line_items: {type: Array, required: true},
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: Object, required: true },
        postel: { type: String, required: true },
        paid: { type: Boolean},
        utr: { type: String,required: true },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;