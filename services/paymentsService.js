const paymentsModel = require("../models/paymentsModel");

const getAllPayments = async () => {
  return await paymentsModel.getAllPayments();
};

const getPaymentById = async (payment_id) => {
  return await paymentsModel.getPaymentById(payment_id);
};

const createPayment = async (payment) => {
  return await paymentsModel.createPayment(payment);
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePaymentById,
};
