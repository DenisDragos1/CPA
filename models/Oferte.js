const mongoose = require('mongoose');

const oferteSchema = new mongoose.Schema({
  titlu: {
    type: String,
    required: true
  },
  descriere: {
    type: String,
    required: true
  },
  imagine: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  tip: {
    type: String,
    required: true
  },
  timp_oferta: {
    type: String,
    required: true
  },
  castig_oferta: {
    type: Number,
    required: true
  },
  numar_maxim_credite: {
    type: Number,
    required: true
  },
  numar_credite_oferta: {
    type: Number,
    required: true
  },
  platforma_CPA: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  timp_completare_oferta: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Oferta', oferteSchema);
