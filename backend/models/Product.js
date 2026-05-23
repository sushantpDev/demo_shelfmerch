import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  pointsRequired: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
