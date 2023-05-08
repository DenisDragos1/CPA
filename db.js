const mongoose = require('mongoose');

// Conectarea la baza de date
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Conectat la baza de date!');
}).catch((err) => {
  console.error('Eroare la conectare:', err.message);
});

// Definirea schemei pentru tabela de utilizatori
const userSchema = new mongoose.Schema({
  nume: {
    type: String,
    required: true
  },
  prenume: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  parola: {
    type: String,
    required: true
  }
});

// Definirea schemei pentru tabela de oferte
const ofertaSchema = new mongoose.Schema({
  titlu: {
    type: String,
    required: true
  },
  descriere: {
    type: String,
    required: true
  },
  imagine: String,
  categorie: String,
  tip: String,
  timp_oferta: Number,
  castig_oferta: Number,
  numar_maxim_credite: Number,
  numar_credite_oferta: Number,
  platforma_CPA: String,
  link: String,
  timp_completare_oferta: Number,
  id_utilizator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Definirea modelului pentru tabela de utilizatori
const User = mongoose.model('User', userSchema);

// Definirea modelului pentru tabela de oferte
const Oferta = mongoose.model('Oferta', ofertaSchema);

// Exportarea modelelor
module.exports = { User, Oferta };

module.exports = async function connectToDB() {
    // cod pentru conexiunea la baza de date
  }