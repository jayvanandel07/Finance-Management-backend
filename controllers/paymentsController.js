const paymentsService = require("../services/paymentsService");

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentsService.getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};
exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await paymentsService.getPaymentById(req.params.payment_id);
    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};
exports.createPayment = async (req, res, next) => {
  try {
    const payment = await paymentsService.createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};
