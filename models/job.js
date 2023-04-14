const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    job_title: { type: String, required: true, trim: true },
    subcon_id: { type: mongoose.ObjectId },
    start: { type: Date },
    end: { type: Date },
    job_status: { type: String },
    work: { type: mongoose.ObjectId, ref: 'Work'  }
},{
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'jobs'
});

const job = mongoose.model('Job', schema);

module.exports = job;