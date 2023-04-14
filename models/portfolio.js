const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String },
  images: [ 
    {type: String, default: 'nopic.png'},
    {type: String, default: 'nopic.png'},
    {type: String, default: 'nopic.png'},
    {type: String, default: 'nopic.png'},
    {type: String, default: 'nopic.png'}
  ],
  maininfo: { 
    title: { type: String },
    project: { type: String },
    owner: { type: String },
    location: { type: String },
    description: { type: String },
},

  created: { type: Date, default: Date.now }
},{
  collection: 'portfolios'
});

const portfolio = mongoose.model('Portfolio', schema);

module.exports = portfolio;