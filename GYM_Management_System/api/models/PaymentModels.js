import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Package', // Reference to the package model
  },
  packageType: {
    type: String,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
