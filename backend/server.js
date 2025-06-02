const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, '..', 'angular-app', 'src', 'assets', 'users.json');

app.post('/save', (req, res) => {
  const newUser = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erreur lecture fichier');

    let users = [];
    try {
      users = JSON.parse(data);
    } catch {
      users = [];
    }

    const emailExists = users.some(u => u.email === newUser.email);
    if (emailExists) {
      return res.status(400).send('Email déjà utilisé');
    }

    users.push(newUser);
    fs.writeFile(filePath, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Erreur écriture');
      res.send('Inscription réussie');
    });
  });
});

app.listen(3000, () => console.log('🚀 Serveur backend sur http://localhost:3000'));
