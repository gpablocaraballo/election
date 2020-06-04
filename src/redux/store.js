import { createStore, combineReducers, applyMiddleware } from 'redux';
import middleware from './middleware';
import election from './reducers/election';

//en combineReducers se pueden poner mas de un reducer, todos separados por coma const reducer = combineReducers({ reducer1, reducer2, reducer3, etc });
const reducer = combineReducers({
    election,
});

const store = createStore(reducer, undefined, applyMiddleware(middleware));
export default store;
