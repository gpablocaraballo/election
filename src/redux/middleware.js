import { getPositions, getDatosResultados } from '../components/common/utils'
import { typeLoadingPositions, typeResponsePositions, typeLoadingResultados, typeResponseResultados } from './actions/loadResult';

const middleware = store => next => action =>{
    const state = store.getState();
    
    console.log("el MID ES: action/state:");
    console.log(action);
    console.log(state);
    
    //store.dispatch({type:'TESTREDUCER'})
    
    if (action.type === typeLoadingPositions){
        console.log("entro al if");

        getPositions(action.payload).then((res) => {
            if (res.data.entity != null){
                let tdefaultposition = 0;
                if (res.data.entity.length > 0){

                    tdefaultposition = res.data.entity[0].id;    
                    store.dispatch( {
                        type:typeLoadingResultados,
                        payload:{"positions":res.data.entity,"defaultposition":tdefaultposition}
                    }
                    );

                }
            }
        })
        .catch(
            (perr) => {
                
                //ERROR DE AJAX, RETORNAMOS UN PAYLOAD VACIO PERO CON UN ATRIBUTO ERROR
                store.dispatch( {type:typeResponsePositions,payload:{"error":true}});

            }
        ).then(function() {

        });


        
    } else if (action.type === typeLoadingResultados) {

        getDatosResultados(action.payload.defaultposition).then((res) => {    
            if (res.data.entity != null){
            
                store.dispatch( {
                    type:typeResponseResultados,
                    payload:{
                            "error":false,
                            "positions":action.payload.positions, 
                            "defaultposition": action.payload.defaultposition,
                            "agrupaciones":res.data.entity.agrupaciones,
                            "totales":res.data.entity.totales,
                            "mesasyvotantes":res.data.entity.mesasyvotantes,
                            "porcmesasescrutadas":res.data.entity.porcmesasescrutadas
                            }
                });

            }
        })
        .catch(
            (perr) => {
                store.dispatch( {
                    type:typeResponseResultados,
                    payload:{
                            "error":true
                            }
                });
            }
        ).then(function() {
        });

    }else {
        next(action);
    }
    
    
};


export default middleware;
