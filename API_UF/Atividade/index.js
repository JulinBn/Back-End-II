const express = require(express);
const { colecaoUf }  = require('../Dados/dados.js');
const colecaoAN = require('./dados.js');

const app = express();

app.get('/.ans/:idan', (req, res) => {
    const idAN = parseInt(req.params.idan);
    let mensagemErro = 'ANIME não encontrado';
    let an;

    if (!(isNaN(idAN))) {
        an = colecaoAN.find(item => item.id === idAN);
        if (!an) {
            mensagemErro = 'ANIME não encontrado';

        }
        else{
            mensagemErro = 'Requisacão inválida';
        }
        if (an) {
            res.json(uf);
        }else{
            res.status(404).json({'erro': mensagemErro})
        }
    }
});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080!')
})