const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    room_type: { type: String },
    room_type_price: { type: Number }
},{
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'room_types'
});


const room_type = mongoose.model('Roomtype', schema);

module.exports = room_type;