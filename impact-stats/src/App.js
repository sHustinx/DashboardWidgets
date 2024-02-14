
import React, { PureComponent } from "react";
import {useState, useEffect} from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();


  return (
      <div className="App">
        <h1 className="text-grey">Average bias <br/>count</h1>
        <div className="buffer-left-25">
          <p className="big-num">5</p>
          <p className="bn-descr text-grey">biased decisions per month</p>
        </div>

        <div className="spacer-50"></div>

        <h1 className="text-grey">Average financial <br/>impact</h1>
        <div className="buffer-left-25">
          <p className="big-num">-7.5k €</p>
          <p className="bn-descr text-grey">per biased decisions</p>
        </div>
      </div>
  );
};

export default App;
