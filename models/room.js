const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' },
    style: { type: String, required: true, trim: true },
    style_price: { type: Number },
    room_type: { type: String },
    room_type_price: { type: Number },
    room_width: {type: Number},
    room_long: {type: Number},
    room_fur: { type: Array }
},{
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'rooms'
});

schema.virtual('room_dimention').get(function () {
    return (this.room_width + this.room_long);
  });

schema.virtual('room_price').get(function () {
  return (this.room_type_price + this.style_price) * (this.room_width * this.room_long);
});

const room = mongoose.model('Room', schema);

module.exports = room;