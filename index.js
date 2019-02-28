import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';

import useModel from './src/useModel';

const App = () => {
  const [multi, setMulti] = useState(false);
  const model1 = useModel();
  const model2 = useModel();

  const render = () => {
    console.log('rendering');
    return (
      <div>
        <button onClick={() => setMulti(false)}>Single instance</button>
        <button onClick={() => setMulti(true)}>Multiple instances</button>
        <div style={{ paddingTop: 25 }}>
          {renderModel(model1, 1)}
          <div style={{ margin: 25, height: 10, background: 'gray' }} />
          {multi && renderModel(model2, 2)}
        </div>
      </div>
    );
  };

  const renderModel = (model, num) => {
    const { state, actions, getters } = model;
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

  return render();
};

ReactDOM.render(<App />, document.querySelector('#root'));
