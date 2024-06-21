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
    { name: 'not reconsidered', value: 59 },
    { name: 'reconsidered and unchanged', value: 26 },
    { name: 'reconsidered and changed', value: 15},
];

const COLORS = ['#224364', '#497c98', '#79aabe'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
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
                <PieChart width={400} height={200}>
                    <Pie
                        data={data}
                        startAngle={180}
                        endAngle={0}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        innerRadius={30}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
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
