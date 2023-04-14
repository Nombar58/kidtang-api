const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String },
  cus_name: { type: String },
  cus_address: { type: String },
  cus_email: { type: String },
  cus_tel: { type: String },
  style: { type: String },
  created_date: { type: Date, default: Date.now }
},{
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'invoices'
});

schema.virtual('rooms', {
  ref: 'Room', //ลิงก์ไปที่โมเดล Room
  localField: '_id', //_id ฟิลด์ของโมเดล Invoice (ไฟล์นี้)
  foreignField: 'invoice' //invoice ฟิลด์ของโมเดล Room (fk)
});

const invoice = mongoose.model('Invoice', schema);

module.exports = invoice;