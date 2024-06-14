import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {


  return (
    <div className="container">
        <div className="item a">test</div>
        <div className="item b">test</div>
        <div className="item c">test</div>
        <div className="item d">test</div>
    </div>
  );
};

export default App;
