import { typeLoadingMesa, typeResponseMesa } from '../actions/loadTable';
import { typeLoadingResultados, typeResponseResultados, typeLoadingPositions, typeResponsePositions } from '../actions/loadResult';
//import items from '../../data/items';
const defaultState = [];
//switch entre diferentes acciones disparadas por eventos de react en sus componentes, dependiendo de la accion, retornamos el json correspondiente
function reducer(state = defaultState, { type, payload }) {
    let ret = { type, payload }
    switch (type) {
        case typeLoadingMesa: {
            if (!payload) { return []; }
            return ret;
        }
        case typeResponseMesa: {
            if (!payload) { return []; }
            return ret;
        }
        case typeLoadingResultados: {
            if (!payload) { return []; }
            return ret;
        }
        case typeResponseResultados: {
            if (!payload) { return []; }
            return ret;
        }
        case typeLoadingPositions: {
            if (!payload) { return []; }
            return ret;
        }
        case typeResponsePositions: {
            if (!payload) { return []; }
            console.log("typeResponsePositions.payload");
            console.log(ret);
            ret.payload = payload;
            return ret;
        }
        default:
            return state;
    }
}
export default reducer;
