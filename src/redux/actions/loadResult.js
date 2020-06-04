export const typeLoadingResultados  = 'cargaResultadosLoading';
export const typeResponseResultados = 'cargaResultadosResponse';

export const typeLoadingPositions  = 'cargaPositionsLoading';
export const typeResponsePositions = 'cargaPositionsResponse';

export const loadingResult = (params) => ({
    type:typeLoadingResultados,
    payload: params,
});

export const responseResult = (result) => ({
    type:typeResponseResultados,
    payload: result,
});

export const loadingPositions = (params) => ({
    type:typeLoadingPositions,
    payload: params,
});

export const responsePositions = (result) => ({
    type:typeResponsePositions,
    payload: result,
});



