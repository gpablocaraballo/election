export const typeLoadingMesa  = 'cargaMesaLoading';
export const typeResponseMesa = 'cargaMesaResponse';

const loadingTable = (idMesa) => ({
    typeLoadingMesa,
    payload: idMesa,
});

const responseTable = (result) => ({
    typeResponseMesa,
    payload: result,
});

export default {loadingTable, responseTable};