const Oferta = require('../models/Oferte');

exports.createOferta = async (req, res) => {
  try {
    const { titlu, descriere, imagine, categorie, tip, timp_oferta, castig_oferta, numar_maxim_credite, numar_credite_oferta, platforma_cpa, link, timp_completare_oferta } = req.body;

    // Creează o nouă ofertă
    const oferta = new Oferta({ titlu, descriere, imagine, categorie, tip, timp_oferta, castig_oferta, numar_maxim_credite, numar_credite_oferta, platforma_cpa, link, timp_completare_oferta });
    await oferta.save();

    res.status(201).json({ message: 'Oferta a fost adăugată cu succes!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'A apărut o eroare la adăugarea ofertei.' });
  }
};

exports.getOferte = async (req, res) => {
  try {
    const oferte = await Oferta.find();

    res.status(200).json(oferte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'A apărut o eroare la obținerea ofertelor.' });
  }
};
