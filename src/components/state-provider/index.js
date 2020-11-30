import reducer from './reducer';
import initialState from './initial-state';
import { StateProvider, useStateValue, StateContext } from './state-provider';
import actionTypes from './actionTypes';

export {
    reducer,
    initialState,
    useStateValue,
    StateContext,
    actionTypes
}

export default StateProvider;