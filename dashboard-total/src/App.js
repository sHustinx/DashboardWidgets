import React, {PureComponent, useState} from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";

import {
    PieChart,
    Pie,
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

/* DATA */

const timeData1 = [
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
        'biased decisions w. negative outcome': 2
    },
    {
        name: 'April',
        'all decisions': 7,
        'biased decisions': 6,
        'biased decisions w. negative outcome': 5
    },
    {
        name: 'May',
        'all decisions': 7,
        'biased decisions': 4,
        'biased decisions w. negative outcome': 2
    },
    {
        name: 'June',
        'all decisions': 6,
        'biased decisions': 3,
        'biased decisions w. negative outcome': 1
    },
    {
        name: 'July',
        'all decisions': 7,
        'biased decisions': 2,
        'biased decisions w. negative outcome': 1
    },
];
const timeData2 = [
    {
        name: 'January',
        'all decisions': 4,
        'biased decisions': 2,
        'biased decisions w. negative outcome': 1
    },
    {
        name: 'February',
        'all decisions': 3,
        'biased decisions': 3,
        'biased decisions w. negative outcome': 2
    },
    {
        name: 'March',
        'all decisions': 3,
        'biased decisions': 2,
        'biased decisions w. negative outcome': 1
    },
    {
        name: 'April',
        'all decisions': 4,
        'biased decisions': 3,
        'biased decisions w. negative outcome': 2
    },
    {
        name: 'May',
        'all decisions': 4,
        'biased decisions': 2,
        'biased decisions w. negative outcome': 1
    },
    {
        name: 'June',
        'all decisions': 3,
        'biased decisions': 1,
        'biased decisions w. negative outcome': 0
    },
    {
        name: 'July',
        'all decisions': 4,
        'biased decisions': 1,
        'biased decisions w. negative outcome': 0
    },
];

const outcomeData = [
    {name: 'undecided', value: 10},
    {name: 'negative', value: 56},
    {name: 'positive', value: 34},
];

const reconsideredData = [
    {name: 'not reconsidered', value: 59},
    {name: 'reconsidered and not changed', value: 26},
    {name: 'reconsidered and changed', value: 15},
];

const decCategorizedData1 = [
    {name: 'tech', value: 60},
    {name: 'finance', value: 15},
    {name: 'marketing', value: 20},
    {name: 'support', value: 5},
];

const decCategorizedData2 = [
    {name: 'implementation', value: 70},
    {name: 'planning', value: 20},
    {name: 'finalization', value: 10},
];


const biases = [
    {
        title: 'Risk Seeking Behaviour',
        whatIsIt: 'Risk-seeking refers to an individual who is willing to accept greater economic uncertainty in exchange for the potential of higher returns.',
        howToPrevent: 'The main strategy to avoid risk-seeking behaviour is introspection and re-considering one\'s decisions, as well as considering all options of a problem thoroughly. ',
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
        description: "This project integrates the current CMS system with the new interface of Company 123 for their customer service.",
        context: "The project is currently in budget (1k € of 45k budget left), but has exceeded the allocated time-frame by 3 months (total: 3 mo. delay). The involved stakeholders (financial services and Company 123) have asked for a re-evaluation of the project.",
        milestones: ["M1", "M2", "M3", "M4"],
        totalMilestones: 6,
        currentMilestone: 4,
        tags: ["tech-domain", "undecided", "over-time", "over-budget", "high-priority", "team 39b"],
    },

];

const biasInfo = {
    "sunk-cost fallacy": "The sunk-cost fallacy is a cognitive bias that causes people to continue an endeavor, or continue consuming or pursuing an option, if they’ve invested time or money or some resource into it, even when it’s clear that it’s no longer viable.",
    "risk-seeking behaviour": "Risk-seeking behavior refers to the tendency to engage in behaviors that have the potential to be harmful or dangerous, yet at the same time provide the opportunity for some kind of outcome that can be perceived as positive.",
    "loss aversion": "Loss aversion is a cognitive bias that describes why, for individuals, the pain of losing is psychologically twice as powerful as the pleasure of gaining."
};


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

/* DATA END */

/* COLORS */

const OUTCOME_COLORS = ['#4b4c57', '#e04d44', '#00a964'];

const DEC_CAT_COLORS = ['#30577d', '#fbaa3e', '#41968f', '#e46978'];

const RECONSIDERED_COLORS = ['#224364', '#497c98', '#79aabe'];


/* COLORS END */

/* COMPONENTS */

const ImpactStats = () => {
    return (
        <div>
            <div className="t-t-left header">
                <h3 className="">Average financial <br/>impact</h3>
                <InfoButton title="What is this?"
                            tooltip={"This is the average financial impact (how much gain or loss) of biased decisions in the past year."}/>
            </div>
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
            <div className="t-t-left header">
                <h3 className="">Average bias <br/>count</h3>
                <InfoButton title="What is this?"
                            tooltip={"This is the average amount of biased decisions per month in the past year."}/>
            </div>

            <div className="align-center">
                <p className="big-num">4</p>
                <p className="bn-descr text-grey">biased decisions per month</p>
            </div>
        </div>
    );
}

const TimelineTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
        const totalDecisions = payload.find(p => p.dataKey === 'all decisions')?.value || 0;
        const biasedDecisions = payload.find(p => p.dataKey === 'biased decisions')?.value || 0;
        const negativeOutcomeDecisions = payload.find(p => p.dataKey === 'biased decisions w. negative outcome')?.value || 0;

        return (
            <div className="custom-tooltip">
                <p className="label">{label}</p>
                <p className="total-decisions"><strong>{totalDecisions}</strong> project decisions made in total:</p>
                <ul>
                    <li><strong>{biasedDecisions}</strong> of them had a <strong>suspected bias</strong></li>
                    <li><strong>{negativeOutcomeDecisions}</strong> of them had a <strong>suspected
                        bias</strong> and <br/>a <strong>negative outcome</strong></li>
                </ul>
            </div>
        );
    }

    return null;
};


class TimeLine extends PureComponent {

    state = {
        selectedDataset: 'dataset1',
    };

    handleDatasetChange = (event) => {
        this.setState({selectedDataset: event.target.value});
    };

    render() {
        const {selectedDataset} = this.state;
        const data = selectedDataset === 'dataset1' ? timeData1 : timeData2;
        return (
            <div className={"fullsize"}>
                <div className="header">
                    <h2>Biased decisions over time</h2>
                    <div className={"timeline-header-pos"}>
                        <div className="dropdown-container">
                            <select id="timeline-dataset-select" onChange={this.handleDatasetChange}
                                    value={selectedDataset}>
                                <option value="dataset1">all projects</option>
                                <option value="dataset2">tech projects</option>
                            </select>
                        </div>
                        <InfoButton title="What is this?"
                                    tooltip={"This is timeline overview of all project decisions made in the past year, how many of those were biased, and how many of the biased decisions had negative consequences."}/>
                    </div>
                </div>

                <ResponsiveContainer width="95%" height="80%">
                    <AreaChart
                        data={data}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis label={{value: 'decisions', angle: -90, position: 'insideLeft'}}/>
                        <Tooltip content={<TimelineTooltip/>}/>
                        <Legend iconType="circle"/>
                        <Area type="linear" dataKey="all decisions" stroke="#A1C0E2" fill="#A1C0E2"
                              activeDot={{fill: 'orange', stroke: '#414141', r: 4}}/>
                        <Area type="linear" dataKey="biased decisions" stroke="#5FA0C6" fill="#5FA0C6"
                              activeDot={{fill: 'orange', stroke: '#414141', r: 4}}/>
                        <Area type="linear" dataKey="biased decisions w. negative outcome" stroke="#5d93be"
                              fill="#5d93be" activeDot={{fill: 'orange', stroke: '#414141', r: 4}}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

const OutcomeTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        const {name, value} = payload[0].payload;
        let description;

        switch (name) {
            case 'undecided':
                description = 'These decisions are still pending and have no registered outcome yet.';
                break;
            case 'negative':
                description = 'These biased decisions had negative consequences. This includes financial- and time-related losses or a project failure.';
                break;
            case 'positive':
                description = 'These biased decisions had successful project outcomes.';
                break;
            default:
                description = '';
        }

        return (
            <div className="custom-tooltip pie-tooltip">
                <p className="label">{`${value}% of biased decisions have a ${name} outcome`}</p>
                <p className="desc">{description}</p>
            </div>
        );
    }

    return null;
};

class Outcome extends PureComponent {

    render() {
        return (
            <div style={{width: '100%', height: '80%'}}>
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
                                <Cell key={`cell-${index}`} fill={OUTCOME_COLORS[index % OUTCOME_COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip content={<OutcomeTooltip/>}/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

const ReconsideredTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        const {name, value} = payload[0].payload;
        let description;

        switch (name) {
            case 'not reconsidered':
                description = 'Decisions that were not reconsidered after receiving feedback on possible biases.';
                break;
            case 'reconsidered and not changed':
                description = 'Decisions that were reconsidered but not changed after receiving feedback on possible biases.';
                break;
            case 'reconsidered and changed':
                description = 'Decisions that were reconsidered and changed after receiving feedback on possible biases.';
                break;
            default:
                description = '';
        }

        return (
            <div className="custom-tooltip pie-tooltip">
                <p className="label">{`${value}% of decisions were ${name}`}</p>
                <p className="desc">{description}</p>
            </div>
        );
    }

    return null;
};


class Reconsidered extends PureComponent {

    render() {
        return (

            <div style={{width: '100%', height: '80%'}}>
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
                                <Cell key={`cell-${index}`}
                                      fill={RECONSIDERED_COLORS[index % RECONSIDERED_COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip content={<ReconsideredTooltip/>}/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

const DecisionCategoriesTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        const {name, value} = payload[0].payload;
        let description;

        switch (name) {
            case 'finance':
                description = 'Biased decisions in the financial domain.';
                break;
            case 'tech':
                description = 'Biased decisions in the technology domain.';
                break;
            case 'marketing':
                description = 'Biased decisions in the marketing domain.';
                break;
            case 'support':
                description = 'Biased decisions in the support domain.';
                break;
            case 'planning':
                description = 'Decisions made during the planning and design stage.';
                break;
            case 'implementation':
                description = 'Decisions made during the implementation and execution stage.';
                break;
            case 'finalization':
                description = 'Decisions made during the final project stage.';
                break;
            default:
                description = '';
        }

        return (
            <div className="custom-tooltip pie-tooltip">
                <p className="label">{`${value}% of biased decisions are in ${name}`}</p>
                <p className="desc">{description}</p>
            </div>
        );
    }

    return null;
};


class DecisionCategories extends PureComponent {
    state = {
        selectedDataset: 'dataset1',
    };

    handleDatasetChange = (event) => {
        this.setState({selectedDataset: event.target.value});
    };

    render() {
        const {selectedDataset} = this.state;
        const data = selectedDataset === 'dataset1' ? decCategorizedData1 : decCategorizedData2;

        return (
            <div className={"fullsize"}>
                <div className="header">
                    <h2>Biased decisions categorized</h2>
                    <div className="dropdown-container">
                        <select id="dataset-select" onChange={this.handleDatasetChange} value={selectedDataset}>
                            <option value="dataset1">per project domain</option>
                            <option value="dataset2">per project stage</option>
                        </select>
                    </div>
                    <InfoButton title="What is this?"
                                tooltip={"This is an info box with brief explanations about the most common risk-related biases you might encounter in project management."}/>
                </div>
                <div style={{width: '100%', height: '80%'}}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={150}
                                innerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={DEC_CAT_COLORS[index % DEC_CAT_COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip content={<DecisionCategoriesTooltip/>}/>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

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

                <InfoButton title="What is this?"
                            tooltip={"This is an info box with brief explanations about the most common risk-related biases you might encounter in project management."}/>
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

const ProjectList = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedBias, setSelectedBias] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedData, setSortedData] = useState(projectData);

    const handleClick = (project) => {
        setSelectedProject(project);
    };

    const handleBiasClick = (bias, event) => {
        event.stopPropagation();
        setSelectedBias(bias);
    };

    const handleClose = () => {
        setSelectedProject(null);
        setSelectedBias(null);
    };

    const handleSort = () => {
        const sorted = [...sortedData].sort((a, b) => {
            const dateA = new Date(a.date.split('-').reverse().join('-'));
            const dateB = new Date(b.date.split('-').reverse().join('-'));
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setSortedData(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    return (
        <div className="project-list-container">
            <div className="project-list-header">
                <div className="project-list-row">
                    <div className="project-list-cell sort-dv"
                         onClick={handleSort}>Date {sortOrder === 'asc' ? '▲' : '▼'}</div>
                    <div className="project-list-cell smaller">Project</div>
                    <div className="project-list-cell">Decision</div>
                    <div className="project-list-cell">Suspected Bias</div>
                    <div className="project-list-cell ">Outcome</div>
                    <div className="project-list-cell bigger">Comment</div>
                </div>
            </div>
            <div className="project-list">
                {sortedData.map((project, index) => (
                    <div key={index} className="project-item" onClick={() => handleClick(project)}>
                        <div className="project-list-row">
                            <div className="bold project-list-cell">{project.date}</div>
                            <div className="bold project-list-cell smaller">{project.project}</div>
                            <div className="project-list-cell">{project.decision}</div>
                            <div className="project-list-cell">
                                {project.suspectedBias.map((bias, idx) => (
                                    <div key={idx}>
                                        <a href={project.reportLink} onClick={(e) => handleBiasClick(bias, e)}>{bias}</a>
                                    </div>
                                ))}
                            </div>
                            <div className="project-list-cell ">{project.outcome} <br/>(<a href={project.reportLink}>see
                                report</a>)
                            </div>
                            <div className="project-list-cell bigger">{project.comment}</div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProject && <ProjectDetail project={selectedProject} onClose={handleClose}/>}
            {selectedBias && <BiasDetail bias={selectedBias} onClose={handleClose}/>}
        </div>
    );
};

const InfoTag = ({text, tooltipText, className}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`glance-tooltip-container ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="glance-tooltip-text">{text}</span>
            {isHovered && <div className="glance-tooltip-content">{tooltipText}</div>}
        </div>
    );
};


const ProjectDetail = ({ project, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Decision {project.project} (Tech Integration Project)</h2>
                <p><strong>Date:</strong> {project.date}</p>
                <p><strong>Decision:</strong> {project.decision}</p>
                <p><strong>Reasoning:</strong> {project.comment}</p>
                <p><strong>Outcome:</strong> {project.outcome}: {project.details}</p>
                <p><strong>Suspected Biases:</strong> {project.suspectedBias.join(", ")}</p>
                <br/>
                <p><strong>Project Description:</strong> {project.description}</p>
                <p>{project.context}</p>
                <p>Milestones ({project.currentMilestone}/{project.totalMilestones} completed)</p>
                <br/>
                <div className="project-at-a-glance">
                    <p><strong>Project at a glance:</strong></p>
                    <div className="tags">
                        {project.tags.map((tag, index) => (
                            <InfoTag key={index} tooltipText="text" className={`tag ${tag}`} text={tag.replace('-', ' ')}></InfoTag>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BiasDetail = ({bias, onClose}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Bias Information</h2>
                <p><strong>Bias:</strong> {bias}</p>
                <p>{biasInfo[bias]}</p>
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

/* COMPONENTS END */


/* APP */
const App = () => {


    return (
        <div className={"screenfit"}>
            <div className="container">
                <div className="item timeline">
                    <TimeLine/>
                </div>
                <div className="item detailview">
                    <div className="header">
                        <h2>Detail view: Biased project decisions</h2>
                        <InfoButton title="What is this?"
                                    tooltip={"This is a detailed overview of decisions that were flagged as biased, their outcome, and the reasoning for the choice made."}/>
                    </div>

                    <ProjectList/>
                </div>
                <div className="item biascount">
                    <AvgBias/>
                </div>
                <div className="item impact">
                    <ImpactStats/>
                </div>

                <div className="item outcome">
                    <div className="header">
                        <h2>Outcome of <br/>biased decisions</h2>
                        <InfoButton title="What is this?"
                                    tooltip={"This is an infographic showing the percentage of biased decisions that had a positive or negative outcome, or that have no registered final outcome yet."}/>
                    </div>

                    <Outcome/>
                </div>
                <div className="item reconsidered">
                    <div className="header">
                        <h2>Decisions reconsidered</h2>
                        <InfoButton title="What is this?"
                                    tooltip={"This is an infographic showing the percentage of biased decisions that were reconsidered and/or changed after receiving a warning about possible biases."}/>
                    </div>
                    <Reconsidered/>
                </div>
                <div className="item categorized">
                    <DecisionCategories/>
                </div>
                <div className="item infobox">
                    <InfoBox/>
                </div>
            </div>
            <div className={"data-context-text"}>All visualizations based on data collected between 01-01-2024 and
                01-06-2024.
            </div>
        </div>
    );
};


export default App;

/* APP END */