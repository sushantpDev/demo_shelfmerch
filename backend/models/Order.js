import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  employeeEmail: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  pointsUsed: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'shipped', 'delivered'], default: 'pending' },
  shippingAddress: { type: String, required: true }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
