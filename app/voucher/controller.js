const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = {message: alertMessage, status: alertStatus};
      const voucher = await Voucher.find()
        .populate('category')
        .populate('nominals');

      res.render('voucher/voucher', {
        voucher,
        alert,
        name: req.session.user.name,
        title: 'Voucher',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/voucher');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();

      res.render('voucher/create', {
        category,
        nominal,
        name: req.session.user.name,
        title: 'Add Voucher',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/voucher');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {gameName, category, nominals} = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`,
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const voucher = new Voucher({
              gameName,
              category,
              nominals,
              thumbnail: filename,
              user: req.session.user.id,
            });

            await voucher.save();

            req.flash('alertMessage', 'Successfully add voucher!');
            req.flash('alertStatus', 'success');

            res.redirect('/voucher');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');

            res.redirect('/voucher');
          }
        });
      } else {
        try {
          const voucher = new Voucher({
            gameName,
            category,
            nominals,
            user: req.session.user.id,
          });

          await voucher.save();

          req.flash('alertMessage', 'Successfully add voucher!');
          req.flash('alertStatus', 'success');

          res.redirect('/voucher');
        } catch (err) {
          req.flash('alertMessage', `${err.message}`);
          req.flash('alertStatus', 'danger');

          res.redirect('/voucher');
        }
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/voucher');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const category = await Category.find();
      const nominal = await Nominal.find();
      const voucher = await Voucher.findOne({_id: id})
        .populate('category')
        .populate('nominals');

      res.render('voucher/edit', {
        voucher,
        category,
        nominal,
        name: req.session.user.name,
        title: 'Edit Voucher',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/voucher');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const {gameName, category, nominals} = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`,
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const voucher = await Voucher.findOne({_id: id});

            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await Voucher.findOneAndUpdate({
              _id: id,
            }, {
              gameName,
              category,
              nominals,
              thumbnail: filename,
              user: req.session.user.id,
            });

            req.flash('alertMessage', 'Successfully update voucher!');
            req.flash('alertStatus', 'success');

            res.redirect('/voucher');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');

            res.redirect('/voucher');
          }
        });
      } else {
        try {
          await Voucher.findOneAndUpdate({
            _id: id,
          }, {
            gameName,
            category,
            nominals,
            user: req.session.user.id,
          });

          req.flash('alertMessage', 'Successfully update voucher!');
          req.flash('alertStatus', 'success');

          res.redirect('/voucher');
        } catch (err) {
          req.flash('alertMessage', `${err.message}`);
          req.flash('alertStatus', 'danger');

          res.redirect('/voucher');
        }
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/voucher');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const {id} = req.params;

      const voucher = await Voucher.findOneAndRemove({_id: id});

      let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      req.flash('alertMessage', 'Successfully delete voucher!');
      req.flash('alertStatus', 'success');

      res.redirect('/voucher');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/voucher');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const {id} = req.params;

      const voucher = await Voucher.findOne({_id: id});
      let status = voucher.status === 'Y' ? 'N' : 'Y';

      await Voucher.findByIdAndUpdate({_id: id}, {status});

      req.flash('alertMessage', 'Successfully update status!');
      req.flash('alertStatus', 'success');

      res.redirect('/voucher');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/voucher');
    }
  },
};
