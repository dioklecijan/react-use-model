
How to use custom hook to expose state, actions and state getters.

```js
const useModel = () => {
  const [state, dispatch] = useReducer(reducer, initState, initFunc);

  return {
    state,
    actions: useMemo(() => mapDispatchToActions(dispatch), [dispatch]),
    getters: useMemo(() => mapStateToGetters(state), [state]),
  };
};

const App = () => {
  const model1 = useModel(); // instance one with state, actions and getters.)
  const model2 = useModel(); // instance two 
  
  const renderModel = (model, modelName) => {
    const { state, actions, getters } = modelName;
    return (
      <div>
        <div onClick={() => actions.inc()}>
          <u>Click to inc counter in model {num}</u>
        </div>
        <hr />
        <div>{JSON.stringify(state)}</div>
        <hr />
        <div>isCounterEven: {getters.isCounterEven()}</div>
        <hr />
        <div onClick={() => actions.incLazy()}>
          inc lazy {JSON.stringify(state)}
        </div>
        <hr />
        <div>isLazyEven: {getters.isLazyEven()}</div>
        <hr />
        <div>isCounterSmall: {getters.isCounterSmall}</div>
      </div>
    );
  };
  
  ...
}
```


