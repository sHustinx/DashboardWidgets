import React, { PureComponent } from 'react';
import {useState, useEffect} from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const data = [
    {
        name: 'January',
        'all decisions': 7,
        'biased decisions': 3,
        'biased decisions w. negative outcome': 3
    },
    {
        name: 'February',
        'all decisions': 6,
        'biased decisions': 5,
        'biased decisions w. negative outcome': 4
    },
    {
        name: 'March',
        'all decisions': 6,
        'biased decisions': 5,
        'biased decisions w. negative outcome': 3
    },
    {
        name: 'April',
        'all decisions': 7,
        'biased decisions': 6,
        'biased decisions w. negative outcome': 5
    },
    {
        name: 'May',
        'all decisions': 5,
        'biased decisions': 5,
        'biased decisions w. negative outcome': 2
    },
    {
        name: 'June',
        'all decisions': 6,
        'biased decisions': 5,
        'biased decisions w. negative outcome': 0
    },
    {
        name: 'July',
        'all decisions': 7,
        'biased decisions': 4,
        'biased decisions w. negative outcome': 2
    },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        console.log(payload);
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label}`}</p>
                <p className="desc">Anything you want can be displayed here.</p>
            </div>
        );
    }

    return null;
};

class TimeLine extends PureComponent {

    render() {
        return (
        <ResponsiveContainer width="90%" height="75%">
            <AreaChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'decisions', angle: -90, position: 'insideLeft' }} />
                <Tooltip/>
                <Legend iconType={"circle"}/>
                <Area type="linear" dataKey="all decisions" stroke="#c4def6" strokeDasharray="5 5" fill="#c4def6"
                      activeDot={{ r: 8 }} />
                <Area type="linear" dataKey="biased decisions" stroke="#85bde0" strokeDasharray="5 5" fill="#85bde0"/>
                <Area type="linear" dataKey="biased decisions w. negative outcome" strokeDasharray="5 5" stroke="#5d93be" fill="#5d93be"/>
            </AreaChart>
        </ResponsiveContainer>
        );
    }
}



const App = () => {
    const [context, setContext] = useState();

    useEffect(() => {
        // Notice this method notifies the monday platform that user gains a first value in an app.
        // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
        monday.execute("valueCreatedForUser");

        // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
        monday.listen("context", (res) => {
            setContext(res.data);
        });
    }, []);




    return (
        <div>

            <div className="App">
                {/*<h2 className="heading">Biased decisions over time</h2>*/}
                <TimeLine/>
            </div>
        </div>
    );
};

export default App;
