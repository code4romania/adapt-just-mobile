import { useReducer } from 'react';

const reducer = (state, action) => {
  const {
    type,
    payload,
  } = action;

  if (type === 'SET_STATE') {
    return {
      ...state,
      ...payload,
    };
  }

  return state;
};

const useWithReducer = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = (payload) => {
    dispatch({
      payload,
      type: 'SET_STATE',
    });
  };

  return [state, setState];
};

export default useWithReducer;
