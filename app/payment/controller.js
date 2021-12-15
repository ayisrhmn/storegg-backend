const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = {message: alertMessage, status: alertStatus};
      const payment = await Payment.find()
        .populate('banks');

      res.render('payment/payment', {payment, alert});
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const bank = await Bank.find();

      res.render('payment/create', {bank});
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {type, banks} = req.body;

      let payment = await Payment({type, banks});
      await payment.save();

      req.flash('alertMessage', 'Successfully add payment!');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const bank = await Bank.find();
      const payment = await Payment.findOne({_id: id})
        .populate('banks');

      res.render('payment/edit', {payment, bank});
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const {type, banks} = req.body;

      await Payment.findOneAndUpdate({_id: id}, {type, banks});

      req.flash('alertMessage', 'Successfully update payment!');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const {id} = req.params;

      await Payment.findOneAndRemove({_id: id});

      req.flash('alertMessage', 'Successfully delete payment!');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const {id} = req.params;

      const payment = await Payment.findOne({_id: id});
      let status = payment.status === 'Y' ? 'N' : 'Y';

      await Payment.findByIdAndUpdate({_id: id}, {status});

      req.flash('alertMessage', 'Successfully update status!');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  },
};
