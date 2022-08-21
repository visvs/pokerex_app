import { SET_LOADING } from '../actions/types';
import { fromJS, setIn } from 'immutable';

//Con fromJS ahora es una estructura inmutable 
const initialState = fromJS({ 
  loading: false,
});

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {    
    case SET_LOADING:
      //return { ...state, loading: action.payload };
      return setIn(state ,["loading"], fromJS(action.payload))
  default:
      return state;
  }
};