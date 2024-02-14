import React, {PureComponent} from "react";
import {useState, useEffect} from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import {ResponsiveContainer} from 'recharts';


//Explore more Monday React Components here: https://style.monday.com/

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
    const [context, setContext] = useState();


    return (
        <div className="App">
            {/*<ResponsiveContainer width="100%" height="100%"></ResponsiveContainer>*/}
                <h3 className="text-grey no-margin">Average bias <br/>count</h3>
                <div className=" align-center">
                    <p className="big-num">5</p>
                    <p className="bn-descr text-grey">biased decisions per month</p>
                </div>

                <div className="spacer-50"></div>

                <h3 className="text-grey no-margin">Average financial <br/>impact</h3>
                <div className=" align-center">
                    <p className="big-num">-7.5k €</p>
                    <p className="bn-descr text-grey">per biased decisions</p>
                </div>
        </div>
    );
};

export default App;
