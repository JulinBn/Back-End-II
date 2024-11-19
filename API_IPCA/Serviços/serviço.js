import Histórico_Inflação from "../Dados/dados.js"

export const buscarTodos = () => {
    return Histórico_Inflação;
};

export const buscarPorAno = (ano) => {
    const resultado = Histórico_Inflação.filter(item => item.ano === parseInt(ano));
    if (resultado.length === 0) {
        return { erro: 'Nenhum historico encontrado para o ano especificado.' };
    }
    return resultado;
};

export const buscarPorId = (id) => {
    const resultado = Histórico_Inflação.find(item => item.id === parseInt(id));
    if (!resultado) {
        return { erro: 'elemento nao encontrado' };
    }
    return resultado;
};

export const calcReajuste = (valor, mesInicial, anoInicial, mesFinal, anoFinal, Histórico_Inflação) => {
    const periodo = Histórico_Inflação.filter(item =>
        (item.ano > anoInicial || (item.ano === anoInicial && item.mes >= mesInicial)) &&
        (item.ano < anoFinal || (item.ano === anoFinal && item.mes <= mesFinal))
    );

    if (periodo.length === 0) {
        return { erro: 'parametros invalidos.' };
    }

    let resultado = parseFloat(valor);
    periodo.forEach(item => {
        resultado *= (1 + item.ipca / 100); 
    });
    const resultadoF = { valorReajustado: resultado.toFixed(2) };

    return resultadoF;
};

export const validarParametros = ({ valor, mesInicial, anoInicial, mesFinal, anoFinal }) => {
    if (!valor || !mesInicial || !anoInicial || !mesFinal || !anoFinal) {
        return 'Parâmetros faltando.';
    }
    if (anoInicial > anoFinal || (anoInicial === anoFinal && mesInicial > mesFinal)) {
        return 'Data inicial não pode ser posterior à data final.';
    }
    if (anoInicial < 2015 || anoFinal > 2023) {
        return 'Ano deve estar entre 2015 e 2023.';
    }
    if (mesInicial < 1 || mesInicial > 12 || mesFinal < 1 || mesFinal > 12) {
        return 'Mês deve estar entre 1 e 12.';
    }
    return null;
};