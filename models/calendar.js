const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String },
  start: { type: Date },
  end: { type: Date }, 
  allday: { type: Boolean, default: false },
  extendedProps: {
    calendar: String
  },
  description: { type: String },
  created: { type: Date, default: Date.now }
},{
  collection: 'calendars'
});

const calendar = mongoose.model('calendar', schema);

module.exports = calendar;