const Nominal = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = {message: alertMessage, status: alertStatus};
      const nominal = await Nominal.find();

      res.render('nominal/nominal', {nominal, alert});
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/nominal');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('nominal/create');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/nominal');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {coinName, coinQty, price} = req.body;

      let nominal = await Nominal({coinName, coinQty, price});
      await nominal.save();

      req.flash('alertMessage', 'Successfully add nominal!');
      req.flash('alertStatus', 'success');

      res.redirect('/nominal');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/nominal');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const nominal = await Nominal.findOne({_id: id});

      res.render('nominal/edit', {nominal});
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/nominal');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const {coinName, coinQty, price} = req.body;

      await Nominal.findOneAndUpdate({_id: id}, {coinName, coinQty, price});

      req.flash('alertMessage', 'Successfully update nominal!');
      req.flash('alertStatus', 'success');

      res.redirect('/nominal');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/nominal');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const {id} = req.params;

      await Nominal.findOneAndRemove({_id: id});

      req.flash('alertMessage', 'Successfully delete nominal!');
      req.flash('alertStatus', 'success');

      res.redirect('/nominal');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/nominal');
    }
  },
};
