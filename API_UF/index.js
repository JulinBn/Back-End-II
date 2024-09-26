const express = require('express');
const colecaoUf = require('./Dados/dados');

const app = express();

app.get('/ufs/:iduf', (req, res) => {
    const idUF = parseInt(req.params.iduf);
    const uf = colecaoUf.colecaoUf.find(item => item.id === idUF);
    res.json(uf);
});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
});