const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    style_name: { type: String, required: true, trim: true },
    style_price: { type: Number }
},{
  collection: 'styles'
});

const style = mongoose.model('Style', schema);

module.exports = style;