const express = require('express');
const colecaoUf = require('./Dados/dados');

const app = express();

const buscraUfsPorNome = (nomeUf) => {
    return colecaoUf.filter(uf => uf.nome.toLowerCase().incluides(nomeUf.toLowerCase()))
}

app.get('/ufs/:iduf', (req, res) => {
    const nomeUf  = req.query.busca;
    const resultado = nomeUf ? buscraUfsPorNome(nomeUf) : colecaoUf;
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ "erro" : "Nenhuma UF encontrada" });
    }

});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
});