const reducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return { ...state, counter: state.counter + 1 };
    case 'DEC':
      return { ...state, counter: state.counter - 1 };

    case 'INC_X':
      return {
        ...state,
        deep: { ...state.deep, x: state.deep.x + action.payload.x },
      };

    case 'INC_LAZY':
      return { ...state, lazy: state.lazy + 1 };

    default:
      return state;
  }
};

export default reducer;
