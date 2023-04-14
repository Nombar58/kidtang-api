const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.ObjectId, ref: 'User' },
  work_title: { type: String },
  start: { type: Date },
  end: { type: Date },
  work_status: { type: String },
  vdo_link: { type: String },
  work_remark: { type: String },
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'works'
});

schema.virtual('jobs', {
  ref: 'Job', //ลิงก์ไปที่โมเดล Job
  localField: '_id', //_id ฟิลด์ของโมเดล Work (ไฟล์นี้)
  foreignField: 'work' //work ฟิลด์ของโมเดล Job (fk)
});

const work = mongoose.model('Work', schema);

module.exports = work;