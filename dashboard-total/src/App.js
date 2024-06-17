import React, { PureComponent, useState } from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";

import {
    PieChart, Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Cell,
    Area
} from 'recharts';


const timeData = [
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

// const DetailView = () => {
//     return (
//         <div className="App">
//             <Table style={{
//                 width: "auto"
//             }}
//                    columns={[
//                        {
//                            id: 'd-date',
//                            loadingStateType: 'medium-text',
//                            title: 'Date',
//                            width:120
//                        },
//                        {
//                            id: 'd-project',
//                            loadingStateType: 'short-text',
//                            title: 'Project',
//                            width:100
//                        },
//                        {
//                            id: 'd-decision',
//                            loadingStateType: 'medium-text',
//                            title: 'Decision'
//                        },
//                        {
//                            id: 'd-bias',
//                            loadingStateType: 'medium-text',
//                            title: 'Bias',
//                            width: 200
//                        },
//                        {
//                            id: 'd-reasoning',
//                            loadingStateType: 'medium-text',
//                            title: 'Reasoning',
//                            width: {
//                                max: 200,
//                                min: 120
//                            }
//                        },
//                        {
//                            id: 'd-outcome',
//                            loadingStateType: 'medium-text',
//                            title: 'Outcome',
//                            width: 150
//                        }
//                    ]}
//             >
//                 <TableHeader>
//                     <TableHeaderCell title="Date" />
//                     <TableHeaderCell title="Project" />
//                     <TableHeaderCell title="Decision" />
//                     <TableHeaderCell title="Suspected Bias" />
//                     <TableHeaderCell title="Reasoning" />
//                     <TableHeaderCell title="Outcome" />
//                 </TableHeader>
//                 <TableBody>
//                     <TableRow>
//                         <TableCell>
//                             2020-01-01
//                         </TableCell>
//                         <TableCell>
//                             123a
//                         </TableCell>
//                         <TableCell>
//                             Continue project 137b
//                             Decided to continue 137b
//                             after a long delays (6 mo.+)
//                         </TableCell>
//                         <TableCell>
//                             sunk-cost fallacy,
//                             risk-seeking behaviour
//                         </TableCell>
//                         <TableCell>
//                             high previous
//                             financial- and time-related investments
//
//                         </TableCell>
//                         <TableCell>
//                             {/*<Label*/}
//                             {/*    color="negative"*/}
//                             {/*    isAnimationDisabled*/}
//                             {/*    text=""*/}
//                             {/*/>*/}
//                             negative
//                         </TableCell>
//                     </TableRow>
//                     <TableRow>
//                         <TableCell>
//                             2020-01-01
//                         </TableCell>
//                         <TableCell>
//                             123a
//                         </TableCell>
//                         <TableCell>
//                             Continue project 137b
//                             Decided to continue 137b
//                             after a long delays (6 mo.+)
//                         </TableCell>
//                         <TableCell>
//                             sunk-cost fallacy,
//                             risk-seeking behaviour
//                         </TableCell>
//                         <TableCell>
//                             high previous
//                             financial- and time-related investments
//
//                         </TableCell>
//                         <TableCell>
//                             {/*<Label*/}
//                             {/*    color="negative"*/}
//                             {/*    isAnimationDisabled*/}
//                             {/*    text=""*/}
//                             {/*/>*/}
//                             negative
//                         </TableCell>
//                     </TableRow>
//                     <TableRow>
//                         <TableCell>
//                             2020-01-01
//                         </TableCell>
//                         <TableCell>
//                             123a
//                         </TableCell>
//                         <TableCell>
//                             Continue project 137b
//                             Decided to continue 137b
//                             after a long delays (6 mo.+)
//                         </TableCell>
//                         <TableCell>
//                             sunk-cost fallacy,
//                             risk-seeking behaviour
//                         </TableCell>
//                         <TableCell>
//                             high previous
//                             financial- and time-related investments
//
//                         </TableCell>
//                         <TableCell>
//                             {/*<Label*/}
//                             {/*    color="negative"*/}
//                             {/*    isAnimationDisabled*/}
//                             {/*    text=""*/}
//                             {/*/>*/}
//                             negative
//                         </TableCell>
//                     </TableRow>
//                     <TableRow>
//                         <TableCell>
//                             2020-01-01
//                         </TableCell>
//                         <TableCell>
//                             123a
//                         </TableCell>
//                         <TableCell>
//                             Continue project 137b
//                             Decided to continue 137b
//                             after a long delays (6 mo.+)
//                         </TableCell>
//                         <TableCell>
//                             sunk-cost fallacy,
//                             risk-seeking behaviour
//                         </TableCell>
//                         <TableCell>
//                             high previous
//                             financial- and time-related investments
//
//                         </TableCell>
//                         <TableCell>
//                             {/*<Label*/}
//                             {/*    color="negative"*/}
//                             {/*    isAnimationDisabled*/}
//                             {/*    text=""*/}
//                             {/*/>*/}
//                             negative
//                         </TableCell>
//                     </TableRow>
//                     <TableRow>
//                         <TableCell>
//                             2020-01-01
//                         </TableCell>
//                         <TableCell>
//                             123a
//                         </TableCell>
//                         <TableCell>
//                             Continue project 137b
//                             Decided to continue 137b
//                             after a long delays (6 mo.+)
//                         </TableCell>
//                         <TableCell>
//                             sunk-cost fallacy,
//                             risk-seeking behaviour
//                         </TableCell>
//                         <TableCell>
//                             high previous
//                             financial- and time-related investments
//
//                         </TableCell>
//                         <TableCell>
//                             {/*<Label*/}
//                             {/*    color="negative"*/}
//                             {/*    isAnimationDisabled*/}
//                             {/*    text=""*/}
//                             {/*/>*/}
//                             negative
//                         </TableCell>
//                     </TableRow>
//
//                     <TableRow>
//                         <TableCell>
//                             2020-01-01
//                         </TableCell>
//                         <TableCell>
//                             123a
//                         </TableCell>
//                         <TableCell>
//                             Continue project 137b
//                             Decided to continue 137b
//                             after a long delays (6 mo.+)
//                         </TableCell>
//                         <TableCell>
//                             sunk-cost fallacy,
//                             risk-seeking behaviour
//                         </TableCell>
//                         <TableCell>
//                             high previous
//                             financial- and time-related investments
//
//                         </TableCell>
//                         <TableCell>
//                             {/*<Label*/}
//                             {/*    color="negative"*/}
//                             {/*    isAnimationDisabled*/}
//                             {/*    text=""*/}
//                             {/*/>*/}
//                             negative
//                         </TableCell>
//                     </TableRow>
//
//                     <TableRow>
//                         <TableCell>
//                             2020-01-01
//                         </TableCell>
//                         <TableCell>
//                             123a
//                         </TableCell>
//                         <TableCell>
//                             Continue project 137b
//                             Decided to continue 137b
//                             after a long delays (6 mo.+)
//                         </TableCell>
//                         <TableCell>
//                             sunk-cost fallacy,
//                             risk-seeking behaviour
//                         </TableCell>
//                         <TableCell>
//                             high previous
//                             financial- and time-related investments
//
//                         </TableCell>
//                         <TableCell>
//                             {/*<Label*/}
//                             {/*    color="negative"*/}
//                             {/*    isAnimationDisabled*/}
//                             {/*    text=""*/}
//                             {/*/>*/}
//                             negative
//                         </TableCell>
//                     </TableRow>
//
//                     <TableRow>
//                         <TableCell>
//                             2020-01-01
//                         </TableCell>
//                         <TableCell>
//                             123a
//                         </TableCell>
//                         <TableCell>
//                             Continue project 137b
//                             Decided to continue 137b
//                             after a long delays (6 mo.+)
//                         </TableCell>
//                         <TableCell>
//                             sunk-cost fallacy,
//                             risk-seeking behaviour
//                         </TableCell>
//                         <TableCell>
//                             high previous
//                             financial- and time-related investments
//
//                         </TableCell>
//                         <TableCell>
//                             {/*<Label*/}
//                             {/*    color="negative"*/}
//                             {/*    isAnimationDisabled*/}
//                             {/*    text=""*/}
//                             {/*/>*/}
//                             negative
//                         </TableCell>
//                     </TableRow>cd
//                 </TableBody>
//             </Table>
//         </div>
//     );
//
// }

const ImpactStats = () => {
    return (
        <div>
            <h3 className="">Average financial <br/>impact</h3>
            <div className="align-center">
                <p className="big-num">-7.5k €</p>
                <p className="bn-descr text-grey">per biased decisions</p>
            </div>
        </div>
    );
}

const AvgBias = () => {
    return (
        <div>
            <h3 className="">Average bias <br/>count</h3>
            <div className="align-center">
                <p className="big-num">5</p>
                <p className="bn-descr text-grey">biased decisions per month</p>
            </div>
        </div>
    );
}


class TimeLine extends PureComponent {

    // todo: add filter function;
    render() {
        return (
            <ResponsiveContainer width="95%" height="75%">
                <AreaChart
                    width={500}
                    height={300}
                    data={timeData}
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


const outcomeData = [
    { name: 'undecided', value: 61 },
    { name: 'negative', value: 36 },
    { name: 'positive', value: 33 },
];

const OUTCOME_COLORS = ['#4b4c57', '#e04d44', '#00a964'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
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
            <div style={{ width: '100%', height: '80%'}}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={outcomeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {outcomeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={OUTCOME_COLORS[index % OUTCOME_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            </div>
        );
    }
}




const reconsideredData = [
    { name: 'not reconsidered', value: 59 },
    { name: 'reconsidered and not changed', value: 26 },
    { name: 'reconsidered and changed', value: 15},
];

const RECONSIDERED_COLORS = ['#224364', '#497c98', '#79aabe'];


class Reconsidered extends PureComponent {

    render() {
        return (

            <div style={{ width: '100%', height: '80%'}}>
            <ResponsiveContainer>
                <PieChart className={"halfpie"}>
                    <Pie
                        data={reconsideredData}
                        startAngle={180}
                        endAngle={0}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {reconsideredData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={RECONSIDERED_COLORS[index % RECONSIDERED_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            </div>
        );
    }
}

const decCategorizedData = [
    { name: 'finance', value: 60 },
    { name: 'tech', value: 15 },
    { name: 'marketing', value: 25 },
];

const DEC_CAT_COLORS = ['#30577d', '#fbaa3e', '#e46978'];

class DecisionCategories extends PureComponent {

    render() {
        return (
            <div style={{ width: '100%', height: '80%'}}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={decCategorizedData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {decCategorizedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={DEC_CAT_COLORS[index % DEC_CAT_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            </div>
        );
    }
}


const biases = [
    {
        title: 'Risk Seeking Behaviour',
        whatIsIt: 'Risk-seeking refers to an individual who is willing to accept greater economic uncertainty in exchange for the potential of higher returns.',
        howToPrevent: 'The main strategy to avoid risk-seeking behaviour is introspection and re-considering one\'s decisions, as well as considering all options of a problem thoroughly. For more info, click here.',
        example: {
            optionOne: {
                title: 'OPTION ONE',
                details: [
                    '50% chance to get 100€',
                    '50% chance to get nothing'
                ],
                description: 'Risk-seeking decision makers tend to prefer this option, although it is financially irrational.'
            },
            optionTwo: {
                title: 'OPTION TWO',
                details: [
                    '100% chance of 50€'
                ],
                description: 'Although this is the financially rational choice, this option is avoided by risk-seeking individuals.'
            }
        }
    },
    {
        title: 'Risk Seeking Behaviour 2',
        whatIsIt: 'Risk-seeking refers to an individual who is willing to accept greater economic uncertainty in exchange for the potential of higher returns.',
        howToPrevent: 'The main strategy to avoid risk-seeking behaviour is introspection and re-considering one\'s decisions, as well as considering all options of a problem thoroughly. For more info, click here.',
        example: {
            optionOne: {
                title: 'OPTION ONE',
                details: [
                    '50% chance to get 100€',
                    '50% chance to get nothing'
                ],
                description: 'Risk-seeking decision makers tend to prefer this option, although it is financially irrational.'
            },
            optionTwo: {
                title: 'OPTION TWO',
                details: [
                    '100% chance of 50€'
                ],
                description: 'Although this is the financially rational choice, this option is avoided by risk-seeking individuals.'
            }
        }
    }
];

const InfoBox = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextBias = () => {
        setCurrentIndex((currentIndex + 1) % biases.length);
    };

    const prevBias = () => {
        setCurrentIndex((currentIndex - 1 + biases.length) % biases.length);
    };

    const currentBias = biases[currentIndex];

    return (
        <div className="info-box-container">
            <div className="content header bg-highlight-color">
                <div className={"button-spacer"}>
                    <button onClick={prevBias}>&#9664;</button>
                    <h2>{currentBias.title}</h2>
                    <button onClick={nextBias}>&#9654;</button>
                </div>

                <InfoButton title="What is this?" tooltip={"This is an info box with brief explanations about the most common risk-related biases you might encounter in project management."}/>
            </div>
            <div className="content">
                <div className="section">
                    <h3>What is it?</h3>
                    <p>{currentBias.whatIsIt}</p>
                </div>
                <div className="section">
                    <h3>How can I prevent it?</h3>
                    <p>{currentBias.howToPrevent}</p>
                </div>
                <div className="example">
                    <div className="box-slanted">
                        <div className="box-slanted__verticalcenter">
                            <h3>Example</h3>
                        </div>
                    </div>
                    <div className={"topscore"}></div>
                    <div className="options ">
                        <div className="option one">
                            <h4 className="header critical-color">{currentBias.example.optionOne.title}
                                <div className="bias-pref">biased preference</div>
                            </h4>
                            {currentBias.example.optionOne.details.map((detail, index) => (
                                <p className="critical-color" key={index}>• {detail}</p>
                            ))}
                            <div className="spacer"></div>
                            <p>{currentBias.example.optionOne.description}</p>
                        </div>
                        <div className="vs">
                            <div className="dotted-line"></div>
                            <span>vs</span>
                        </div>
                        <div className="option two">
                            <h4 className="positive-color">{currentBias.example.optionTwo.title}</h4>
                            {currentBias.example.optionTwo.details.map((detail, index) => (
                                <p className="positive-color" key={index}>• {detail}</p>
                            ))}
                            <div className="spacer"></div>
                            <p>{currentBias.example.optionTwo.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const projectData = [
    {
        date: "18-12-2023",
        project: "137b",
        decision: "Continue project 137b",
        details: "Decided to continue 137b after a long delay (6 mo.+)",
        suspectedBias: ["sunk-cost fallacy", "risk-seeking behaviour"],
        outcome: "negative",
        comment: "high previous financial- and time-related investments",
        reportLink: "#",
    },
    {
        date: "5-11-2023",
        project: "12a",
        decision: "Kill project 12a",
        details: "Decided to discontinue 12a early after increased costs",
        suspectedBias: ["loss aversion"],
        outcome: "negative",
        comment: "previous financial losses in multiple other projects",
        reportLink: "#",
    },
    {
        date: "1-10-2023",
        project: "7c",
        decision: "Continue project 7c",
        details: "Decided to continue 7c after increased costs",
        suspectedBias: ["sunk-cost fallacy"],
        outcome: "positive",
        comment: "high previous financial- and time-related investments",
        reportLink: "#",
    },
    {
        date: "18-12-2023",
        project: "137b",
        decision: "Continue project 137b",
        details: "Decided to continue 137b after a long delay (6 mo.+)",
        suspectedBias: ["sunk-cost fallacy", "risk-seeking behaviour"],
        outcome: "negative",
        comment: "high previous financial- and time-related investments",
        reportLink: "#",
    },
    {
        date: "5-11-2023",
        project: "12a",
        decision: "Kill project 12a",
        details: "Decided to discontinue 12a early after increased costs",
        suspectedBias: ["loss aversion"],
        outcome: "negative",
        comment: "previous financial losses in multiple other projects",
        reportLink: "#",
    },
    {
        date: "1-10-2023",
        project: "7c",
        decision: "Continue project 7c",
        details: "Decided to continue 7c after increased costs",
        suspectedBias: ["sunk-cost fallacy"],
        outcome: "positive",
        comment: "high previous financial- and time-related investments",
        reportLink: "#",
    },
];

const ProjectList = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleClick = (project) => {
        setSelectedProject(project);
    };

    const handleClose = () => {
        setSelectedProject(null);
    };

    return (
        <div className="project-list-container">
            <div className="project-list-header">
                <div className="project-list-row">
                    <div className="project-list-cell">Date ▼</div>
                    <div className="project-list-cell">Project</div>
                    <div className="project-list-cell">Decision</div>
                    <div className="project-list-cell">Suspected Bias</div>
                    <div className="project-list-cell">Outcome</div>
                    <div className="project-list-cell">Comment</div>
                </div>
            </div>
            <div className="project-list">
                {projectData.map((project, index) => (
                    <div key={index} className="project-item" onClick={() => handleClick(project)}>
                        <div className="project-list-row">
                            <div className="project-list-cell">{project.date}</div>
                            <div className="project-list-cell">{project.project}</div>
                            <div className="project-list-cell">{project.decision}</div>
                            <div className="project-list-cell">{project.suspectedBias.join(", ")}</div>
                            <div className="project-list-cell">{project.outcome} (<a href={project.reportLink}>see report</a>)</div>
                            <div className="project-list-cell">{project.comment}</div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProject && <ProjectDetail project={selectedProject} onClose={handleClose} />}
        </div>
    );
};

const ProjectDetail = ({ project, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Project {project.project}</h2>
                <p><strong>Date:</strong> {project.date}</p>
                <p><strong>Decision:</strong> {project.decision}</p>
                <p><strong>Details:</strong> {project.details}</p>
                <p><strong>Suspected Bias:</strong> {project.suspectedBias.join(", ")}</p>
                <p><strong>Outcome:</strong> {project.outcome} (<a href={project.reportLink}>see report</a>)</p>
                <p><strong>Comment:</strong> {project.comment}</p>
            </div>
        </div>
    );
};


const InfoButton = ({title, tooltip}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="info-button "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="info-icon">?</span>
            {isHovered &&
                <div className="tooltip"><h4>{title}</h4><p>{tooltip}</p></div>}
        </div>
    );
};


const App = () => {


  return (
    <div className="container">
        <div className="item timeline">
            <h2>Biased decisions over time</h2>
            <TimeLine/>
        </div>
        <div className="item detailview">
            <h2>Detail view: Biased project decisions</h2>
            <ProjectList />
        </div>
        <div className="item biascount">
            <AvgBias/>
        </div>
        <div className="item impact">
            <ImpactStats/>
        </div>

        <div className="item outcome">
            <h2>Outcome of <br/>biased decisions</h2>
            <Outcome/>
        </div>
        <div className="item reconsidered">
            <h2>Decisions reconsidered</h2>
            <Reconsidered/>
        </div>
        <div className="item categorized">
            <h2>Biased decisions <br/>categorized</h2>
            <DecisionCategories/>
        </div>
        <div className="item infobox">
            <InfoBox />
        </div>
    </div>
  );
};

// TODO add all info boxes
export default App;
