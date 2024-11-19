import express from 'express';
import { BuscarTodos, BuscarPorAno, BuscarPorId, CalcularReajuste, validarParametros } from './Serviços/serviço.js';

const app = express();

app.get('/historicoIPCA/calculo', (req, res) => {
    const valor = parseFloat(req.query.Valor);
    const mesInicial = parseInt(req.query.MesInicial);
    const anoInicial = parseInt(req.query.AnoInicial);
    const mesFinal = parseInt(req.query.MesFinal);
    const anoFinal = parseInt(req.query.AnoFinal);
    
    const erro = validarParametros({ valor, MesInicial, AnoInicial, MesFinal, AnoFinal });
    if (erro) {
        return res.status(400).send({ erro });
    }
    const Histórico_Inflação = BuscarTodos();

    const resultado = CalcularReajuste(Valor, MesInicial, AnoInicial, MesFinal, AnoFinal, Histórico_Inflação);

    if (resultado.erro) {
        return res.status(400).send(resultado);
    }
    res.json(resultado);
});

app.get('/historicoIPCA', (req, res) => {
    const { ano } = req.query;
    if (ano) {
        const resultado = BuscarPorAno(parseInt(ano));
        if (resultado.erro) {
            return res.status(404).send(resultado);
        }
        return res.json(resultado);
    }
    res.json(BuscarTodos());
}); 

app.get('/historicoIPCA/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const resultado = buscarPorId(id);
    if (resultado.erro) {
        res.status(404).send(resultado);
    } else {
        res.json(resultado);
    }
});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080 http://localhost:8080');
});