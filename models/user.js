const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, index: true },
  password: { type: String, required: true, trim: true , minlength: 4 },
  role: { type: String, default: 'customer' },
  address: { type: String },
  tel: { type: String },
},{
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'users' 
});

schema.methods.encryptPassword = async function(password) {
   const salt = await bcrypt.genSalt(5);
   const hashPassword = await bcrypt.hash(password, salt);
   return hashPassword;
}

schema.methods.checkPassword = async function(password) {
   const isValid = await bcrypt.compare(password, this.password);
   return isValid;
}

schema.virtual('works', {
  ref: 'Work', //ลิงก์ไปที่โมเดล Work
  localField: '_id', //_id ฟิลด์ของโมเดล User (ไฟล์นี้)
  foreignField: 'user' //user ฟิลด์ของโมเดล Work (fk)
});

const user = mongoose.model('User', schema);

module.exports = user;