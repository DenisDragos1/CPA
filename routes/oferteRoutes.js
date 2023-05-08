const express = require('express');
const router = express.Router();
const Oferta = require('../models/Oferte');

router.get('/adauga', (req, res) => {
  res.render('oferte/adauga');
});

router.post('/adauga', async (req, res) => {
  try {
    const oferta = new Oferta({
      titlu: req.body.titlu,
      descriere: req.body.descriere,
      imagine: req.body.imagine,
      categorie: req.body.categorie,
      tip: req.body.tip,
      timp_oferta: req.body.timp_oferta,
      castig_oferta: req.body.castig_oferta,
      numar_maxim_credite: req.body.numar_maxim_credite,
      numar_credite_oferta: req.body.numar_credite_oferta,
      platforma_cpa: req.body.platforma_cpa,
      link: req.body.link,
      timp_completare_oferta: req.body.timp_completare_oferta,
      userId: req.session.userId
    });

    await oferta.save();
    res.redirect('/oferte');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
