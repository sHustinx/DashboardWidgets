import React, { PureComponent } from 'react';
import {useState, useEffect} from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/

import {PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell} from 'recharts';


// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const data = [
    { name: 'finance', value: 60 },
    { name: 'tech', value: 15 },
    { name: 'marketing', value: 25 },
];

const COLORS = ['#30577d', '#fbaa3e', '#e46978'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

class Outcome extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <h1>Infobox </h1>
            </ResponsiveContainer>
        );
    }
}



const App = () => {

    return (
        <div className="App">
            <Outcome/>
        </div>
    );
};

export default App;
