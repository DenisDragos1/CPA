const express = require('express');
const mongoose = require('mongoose');
const expressLayouts=require('express-ejs-layouts');
const app = express();
const path = require("path")
const session = require('express-session');
const User = require('./models/User');
app.use(express.urlencoded({extended:true}));
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(express.json())

// Configurare baza de date
require('dotenv').config();
mongoose.connect('mongodb+srv://userCPA:' + process.env.DB_PASS + '@cluster0.phgjr1c.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexiune reușită la baza de date!');
  })
  .catch((err) => {
    console.error('Eroare la conexiunea cu baza de date:', err);
  });


// Middleware pentru setarea variabilei user
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});



//static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))


//app.set('views','./views')
app.use(expressLayouts)
app.set(expressLayouts,'./layout')
app.set('view engine','ejs')

app.get('', (req, res) => {
    //res.send('Bine ați venit pe pagina principală!');
    
    res.render('index')
    res.locals.user = req.session.user;
    next();
    
  })
 
  
  app.get('/about', (req, res) => {
    //res.send('Bine ați venit pe pagina principală!');
    res.render('about')
    
  })
// Setarea folderului static pentru resursele publice
app.use(express.static('public'));
// Setarea parser-ului pentru cererile POST
app.use(express.urlencoded({ extended: true }));

// Ruta pentru afișarea paginii de înregistrare
app.get('/register', (req, res) => {
  var text="pagina de inregistrare";
  res.render('user/register', { text: text,layout: 'layout' });

});

// Ruta pentru procesarea datelor de înregistrare
app.post('/register', async (req, res) => {
  try {
    const { nume, prenume, email, parola } = req.body;

    // Verifică dacă utilizatorul există deja în baza de date
   const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Un utilizator cu acest email există deja!' });
    }

    // Creează un nou utilizator
    const user = new User({ nume, prenume, email, parola });
    await user.save();

    res.render('user/register', { layout: 'layout', successMessage: 'Utilizatorul a fost înregistrat cu succes!' });
    
  } catch (error) {
    console.error(error);
    res.render('user/register', { layout: 'layout', errorMessage: 'A apărut o eroare la înregistrarea utilizatorului.' });
  }
});

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000 // 30 minutes
  }
}));

app.get('/login', (req, res) => {
  // Renderează pagina de login folosind EJS
  res.render('user/login',{title:'Login page',expressLayouts: '.layout'})
});


app.post('/login', async (req, res) => {
  const { email, parola } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.parola !== parola) {
      res.render('user/login', { error: 'Email sau parolă incorectă' });
      return;
    }
    // autentificare reușită
    req.session.userId = user._id;
    req.session.user = user;
    console.log(user.nume);
    console.log(user.prenume);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('user/login', { error: 'Eroare la autentificare' });
  }
});
app.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login');
});

// procesare formular de autentificare
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});


app.get('/oferte', (req, res) => {
  res.render('oferte/vizualizare', { text: text,layout: 'layout' });
});

app.get('/adaugare-oferta', (req, res) => {
  res.render('oferte/adauga', { text: text,layout: 'layout' });
});

const oferteRoutes = require('./routes/oferteRoutes');

app.use('/oferte', oferteRoutes);

// Pornire server
app.listen(3000, () => {
  console.log('Aplicația rulează pe portul 3000!');
});
