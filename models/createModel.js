const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['bar', 'line', 'pie', 'doughnut', 'radar'],
    required: true
  },
  labels: {           
    type: [String],
    required: true
  },
  values: {           
    type: [Number],
    required: true
  },
  datasetLabel: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Create = mongoose.model('Create', createSchema); // Nome do model corrigido
module.exports = Create;
