import Histórico_Inflação from "../Dados/dados.js"

export const BuscarTodos = () => {
    return Histórico_Inflação;
};

export const BuscarPorAno = (ano) => {
    const resultado = Histórico_Inflação.filter(item => item.ano === parseInt(ano));
    if (resultado.length === 0) {
        return { erro: 'Nenhum historico encontrado para o ano especificado.' };
    }
    return resultado;
};

export const BuscarPorId = (id) => {
    const resultado = Histórico_Inflação.find(item => item.id === parseInt(id));
    if (!resultado) {
        return { erro: 'elemento nao encontrado' };
    }
    return resultado;
};

export const CalcReajuste = (Valor, MesInicial, AnoInicial, MesFinal, AnoFinal, Histórico_Inflação) => {
    const periodo = Histórico_Inflação.filter(item =>
        (item.ano > AnoInicial || (item.ano === AnoInicial && item.mes >= MesInicial)) &&
        (item.ano < AnoFinal || (item.ano === AnoFinal && item.mes <= MesFinal))
    );

    if (periodo.length === 0) {
        return { erro: 'parametros invalidos.' };
    }

    let resultado = parseFloat(Valor);
    periodo.forEach(item => {
        resultado *= (1 + item.ipca / 100); 
    });
    const resultadoF = { valorReajustado: resultado.toFixed(2) };

    return resultadoF;
};

export const validarParametros = ({ Valor, MesInicial, AnoInicial, MesFinal, AnoFinal }) => {
    if (!Valor || !MesInicial || !AnoInicial || !MesFinal || !AnoFinal) {
        return 'Parâmetros faltando.';
    }
    if (AnoInicial > AnoFinal || (AnoInicial === AnoFinal && MesInicial > MesFinal)) {
        return 'Data inicial não pode ser posterior à data final.';
    }
    if (AnoInicial < 2015 || AnoFinal > 2023) {
        return 'Ano deve estar entre 2015 e 2023.';
    }
    if (MesInicial < 1 || MesInicial > 12 || MesFinal < 1 || MesFinal > 12) {
        return 'Mês deve estar entre 1 e 12.';
    }
    return null;
};