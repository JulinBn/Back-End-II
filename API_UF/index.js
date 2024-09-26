const express = require('express');
const colecaoUf = require('./Dados/dados');

const app = express();

app.get('/ufs/:iduf', (req, res) => {
    const idUF = parseInt(req.params.iduf);
    let mensagemErro = 'UF não encontrada';
    let uf;

    if (!(isNaN(idUF))) {
        uf = colecaoUf.colecaoUf.find(item => item.id === idUF);
        if (!uf) {
            mensagemErro = 'UF não encotrada';
        }
} else {
        mensagemErro = 'Requisição inválida';
        }

        if (uf) {
            res.json(uf);
        }   else {
            res.status(404).json({"erro": mensagemErro});
        }

});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
});