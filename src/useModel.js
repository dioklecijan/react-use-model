import React, { useMemo, useState, useReducer, useEffect } from 'react';

import reducer from './reducer';

const initState = {
  counter: -99,
  deep: {
    x: 1,
  },
  lazy: 7,
};

const initFunc = initState => ({ ...initState, counter: 2 });

// custom hook for handling state
const useModel = () => {
  const [state, dispatch] = useReducer(reducer, initState, initFunc);

  return {
    state,
    actions: useMemo(() => mapDispatchToActions(dispatch), [dispatch]),
    getters: useMemo(() => mapStateToGetters(state), [state]),
  };
};

const mapDispatchToActions = dispatch => {
  console.log('mapDispatchToActions called');
  return {
    inc: () => dispatch({ type: 'INC' }),
    incX: x => dispatch({ type: 'INC_X', payload: { x: x } }),
    dec: () => dispatch({ type: 'DEC' }),
    incLazy: () => dispatch({ type: 'INC_LAZY' }),
  };
};

// TODO: Geting "Rendered more hooks than during the previous render."
// with local useMemo in mapStateToGetters for:
//    const MyComp = () => {
//     const [multi, setMulti] = useState(false)
//      model1 = useModel()
//      model2 = useModel()
//      return (<div>{renderModel1()} <hr/> {multi && renderModel2()}</div>)
//    }
// even both models are always visible.
const mapStateToGetters = state => {
  console.log('mapStateToGetters called');
  return {
    isCounterEven: () => (state.counter % 2 === 0 ? 'Yes' : 'No'),
    // useMemo(() => {
    //   console.log('isCounterEven exec');
    //   return state.counter % 2 === 0 ? 'Yes' : 'No';
    // }, [state.counter]),
    isLazyEven: () => (state.lazy % 2 === 0 ? 'Yes' : 'No'),
    // useMemo(() => {
    //   console.log('isLazyEven executed');
    //   return state.lazy % 2 === 0 ? 'Yes' : 'No';
    // }, [state.lazy]),
    isCounterSmall: state.counter < 10 ? 'Yes' : 'No',
  };
};

export default useModel;
