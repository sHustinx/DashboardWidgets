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
        'biased decisions': 2,
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
        'all decisions': 2,
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
        howToPrevent: 'Use structured decision-making processes that weigh potential risks against rewards objectively. Use introspection and consider all options of a problem thoroughly before finalizing a decision. ',
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
        "title": "Status Quo Bias",
        "whatIsIt": "Status quo bias is the preference of maintaining the current state over change, even when evidence indicates that change would be beneficial. ",
        "howToPrevent": "Encourage openness to change and challenge the assumptions underlying the status quo. Consider carefully whether alternative options might be more beneficial or promising than the current state.",
        "example": {
            "optionOne": {
                "title": "Option One",
                "details": [
                    "Continuing with a project despite significant setbacks."
                ],
                "description": "Status quo bias might lead decision-makers to maintain current strategies despite clear evidence of their ineffectiveness."
            },
            "optionTwo": {
                "title": "Option Two",
                "details": [
                    "Implementing a new strategy based on market research and analysis."
                ],
                "description": "A more proactive approach would involve adapting to changing circumstances to achieve better outcomes."
            }
        }
    },
    {
        "title": "Sunk-Cost Fallacy",
        "whatIsIt": "The sunk-cost fallacy is a cognitive bias where individuals justify increased investment in a decision based on high previous investments, despite new evidence suggesting that the cost outweighs the benefits.",
        "howToPrevent": "Recognize that past investments are sunk costs and should not influence future decisions. Regularly reassess projects based on current circumstances rather than past investments.",
        "example": {
            "optionOne": {
                "title": "Option One",
                "details": [
                    "continuing a troubled project because of previous investments"
                ],
                "description": "A decision influenced by sunk-cost fallacy might continue investing in a failing project hoping to recover past investments."
            },
            "optionTwo": {
                "title": "Option Two",
                "details": [
                    "stopping a project regardless of previous investments if odds are unfavourable"
                ],
                "description": "A more rational decision would cut losses early and invest in more promising opportunities."
            }
        }
    },
    {
        "title": "Loss Aversion",
        "whatIsIt": "Loss aversion is a cognitive bias where individuals strongly prefer avoiding losses to acquiring gains of the same value. This bias is often combined with regret aversion, where decision-makers tend to prefer decisions that minimize the threat of future regrets.",
        "howToPrevent": "Separate emotions from decision-making by focusing on objective criteria, such as values. Be mindful of leading terms that can evoke strong emotions, such as 'loss' or 'failure'. For example, in a scenario where a disease is expected to kill 600 people, people largely prefer options that are worded positively (see below). ",
        "example": {
            "optionOne": {
                "title": "Option One",
                "details": [
                    "If Program A is adopted, 200 people will be saved."
                ],
                "description": "This option is numerically identical to option B, yet largely preferred by a majority of people due to a more positive framing."
            },
            "optionTwo": {
                "title": "Option Two",
                "details": [
                    "If Program B is adopted 400 people will die."
                ],
                "description": "Although this option is numerically identical, it evokes strong loss-aversion and is therefore avoided by the majority of decision makers."
            }
        }
    },
    {
        "title": "Over-Optimism",
        "whatIsIt": "Over-optimism is a cognitive bias where individuals show the tendency to expect positive outcomes and underestimate risks, leading to irrational decisions despite ongoing setbacks or negative indicators.",
        "howToPrevent": "Encourage realistic assessments and challenge existing assumptions. Implement robust risk assessment frameworks to objectively evaluate project feasibility.",
        "example": {
            "optionOne": {
                "title": "Option One",
                "details": [
                    "Risky investment promising high returns."
                ],
                "description": "Over-optimistic decision-makers might pursue this option without fully assessing potential risks and downsides."
            },
            "optionTwo": {
                "title": "Option Two",
                "details": [
                    "Safer investment with moderate returns."
                ],
                "description": "A more balanced decision would consider both potential gains and risks realistically."
            }
        }
    },
];


const projectData = [
    {
        date: "15-01-2024",
        project: "137b",
        decision: "Continue project",
        details: "The continued project is currently behind schedule and over budget.",
        suspectedBias: ["sunk-cost fallacy", "risk-seeking behaviour"],
        outcome: "negative",
        comment: "We've already invested a lot of time and money into this project, so we decided to continue despite the issues.",
        reportLink: "#",
        description: "This project integrates the current CMS system with a new interface for the customer service website.",
        context: "The project was continued, but has exceeded the allocated time-frame by 3 months (total: 3 mo. delay) and the given budget by 20k€. ",
        totalMilestones: 6,
        currentMilestone: 3,
        tags: ["tech-domain", "negative outcome", "over-time", "over-budget", "high-priority", "team 39b"],
    },
    {
        date: "20-06-2024",
        project: "248c",
        decision: "Continue project",
        details: "The project has faced several technical challenges, leading to delays and increased costs.",
        suspectedBias: ["sunk-cost fallacy", "over-optimism"],
        outcome: "negative",
        comment: "We believed that additional resources would help overcome the current issues, even though we were facing ongoing setbacks.",
        reportLink: "#",
        description: "This project involves developing a new mobile app for the company's e-commerce platform.",
        context: "The project continued, resulting in a further 2-month delay and additional costs of 15k€, without significant progress.",
        totalMilestones: 5,
        currentMilestone: 2,
        tags: ["tech-domain", "negative outcome", "over-time", "over-budget", "high-priority", "team 52d"]
    },
    {
        date: "10-03-2024",
        project: "312f",
        decision: "Stop project",
        details: "Despite significant progress, the project was halted due to external market changes.",
        suspectedBias: ["loss aversion"],
        outcome: "negative",
        comment: "We decided to stop the project due to fears of further loss amidst unpredictable market trends.",
        reportLink: "#",
        description: "This project aimed at launching a new product line targeting young adults.",
        context: "The project was stopped, leading to an immediate write-off of 40k€ invested so far. Market analysis later showed that the product could have been successful.",
        totalMilestones: 4,
        currentMilestone: 3,
        tags: ["market-analysis", "negative outcome", "potential success", "high-priority", "team 14a"]
    },
    {
        date: "25-03-2024",
        project: "456h",
        decision: "Continue project",
        details: "The project has consistently missed deadlines and has not met quality standards.",
        suspectedBias: ["status quo bias"],
        outcome: "negative",
        comment: "We continued with the belief that issues would resolve over time, despite evidence suggesting otherwise.",
        reportLink: "#",
        description: "This project involves upgrading the company's internal HR system.",
        context: "The project continued, but ultimately failed to deliver, resulting in a total budget overrun of 30k€ and a delay of 5 months.",
        totalMilestones: 7,
        currentMilestone: 4,
        tags: ["internal-project", "negative outcome", "over-time", "over-budget", "medium-priority", "team 22c"]
    },
    {
        date: "05-04-2024",
        project: "579k",
        decision: "Stop project",
        details: "Initial investment did not yield the expected early results, leading to project termination.",
        suspectedBias: ["loss aversion"],
        outcome: "neutral",
        comment: "We stopped the project prematurely because we saw too many short-term losses.",
        reportLink: "#",
        description: "This project was focused on developing an AI-driven customer support chatbot.",
        context: "The project was stopped after an investment of 25k€, even though projected long-term benefits were high. The company later regretted this decision as competitors successfully launched similar products.",
        totalMilestones: 5,
        currentMilestone: 2,
        tags: ["AI", "neutral outcome", "high-potential", "medium-priority", "team 33e"]
    },
    {
        date: "20-05-2024",
        project: "681m",
        decision: "Continue project",
        details: "The project has encountered frequent scope changes, leading to increased complexity and costs.",
        suspectedBias: ["sunk-cost fallacy", "over-optimism"],
        outcome: "negative",
        comment: "We decided to continue the project, hoping that additional funding and time would eventually lead to success.",
        reportLink: "#",
        description: "This project involves developing a new CRM system for managing customer relationships.",
        context: "The project continued but faced ongoing challenges, resulting in an additional cost of 20k€ and a 3-month delay.",
        totalMilestones: 6,
        currentMilestone: 3,
        tags: ["CRM", "negative outcome", "over-time", "over-budget", "high-priority", "team 47b"]
    },
    {
        date: "30-02-2024",
        project: "792p",
        decision: "Continue project",
        details: "The project had initial budget overruns and timeline delays but showed potential for high returns.",
        suspectedBias: ["sunk-cost fallacy", "over-optimism"],
        outcome: "positive",
        comment: "Despite the setbacks, we decided to continue the project due to our significant prior investments and belief in potential high returns.",
        reportLink: "#",
        description: "This project aimed at developing a new cloud-based collaboration tool.",
        context: "The project faced a 20k€ budget overrun and a 2-month delay, but ultimately succeeded, generating 120k€ in revenue.",
        totalMilestones: 6,
        currentMilestone: 4,
        tags: ["cloud-technology", "positive outcome", "over-budget", "over-time", "high-priority", "team 19b"]
    },
    {
        date: "15-04-2024",
        project: "853q",
        decision: "Continue project",
        details: "The project was continued despite financial and scheduling challenges.",
        suspectedBias: ["status quo bias", "sunk-cost fallacy"],
        outcome: "positive",
        comment: "We believed in the project's success despite negative indicators and continued to invest.",
        reportLink: "#",
        description: "This project involves creating a new data analytics platform for enterprise clients.",
        context: "The project exceeded its budget by 30k€ and was delayed by 3 months but eventually delivered a successful product, leading to contracts worth 200k€.",
        totalMilestones: 5,
        currentMilestone: 3,
        tags: ["data-analytics", "positive outcome", "over-budget", "over-time", "high-priority", "team 28d"]
    }
];


// const biasInfo = {
//     "sunk-cost fallacy": "The sunk-cost fallacy is a cognitive bias that causes people to continue an endeavor, or continue consuming or pursuing an option, if they’ve invested time or money or some resource into it, even when it’s clear that it’s no longer viable.",
//     "risk-seeking behaviour": "Risk-seeking behavior refers to the tendency to engage in behaviors that have the potential to be harmful or dangerous, yet at the same time provide the opportunity for some kind of outcome that can be perceived as positive.",
//     "loss aversion": "Loss aversion is a cognitive bias that describes why, for individuals, the pain of losing is psychologically twice as powerful as the pleasure of gaining."
// };

const biasInfo = {
    "sunk-cost fallacy": "The sunk-cost fallacy is a cognitive bias where individuals justify increased investment in a decision based on high previous investments, despite new evidence suggesting that the cost outweighs the benefits.",

    "over-optimism": "Over-optimism is a cognitive bias where individuals show the tendency to expect positive outcomes and underestimate risks, leading to irrational decisions despite ongoing setbacks or negative indicators.",

    "risk-seeking behaviour": "Risk-seeking behavior refers to the tendency to pursue actions with uncertain outcomes that offer potential rewards, even when the likelihood of success is low and risks are high.",

    "loss aversion": "Loss aversion is a cognitive bias where individuals strongly prefer avoiding losses to acquiring gains of the same value. This is often combined with regret aversion, where decision makers tend to prefer decisions that minimize the threat of future regrets.",

    "status quo bias": "Status quo bias is the preference for the current state of affairs over change, even when evidence indicates that change would be beneficial. This bias can lead to escalated commitment in projects despite evidence of failure.",

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
                <h3 className="">Avg. financial <br/>impact</h3>
                <InfoButton title="What is this?"
                            tooltip={"This is the average financial impact (how much gain or loss) of biased decisions in the past year."}/>
            </div>
            <div className="align-center">
                <p className="big-num">-7.5k €</p>
                <p className="bn-descr text-grey">per biased <br/>decision</p>
            </div>
        </div>
    );
}

const AvgBias = () => {
    return (
        <div>
            <div className="t-t-left header">
                <h3 className="">Avg. bias <br/>count</h3>
                <InfoButton title="What is this?"
                            tooltip={"This is the average amount of biased decisions per month in the past year."}/>
            </div>

            <div className="align-center">
                <p className="big-num">4</p>
                <p className="bn-descr text-grey">biased decisions a month</p>
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
                            innerRadius={'30%'}
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
                            innerRadius={'30%'}
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
                <p className="label">{`${value}% of biased decisions occur during ${name}`}</p>
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
                                innerRadius={'30%'}
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
    const [sortOrder, setSortOrder] = useState('desc'); // Initialize sortOrder to 'desc'
    const [sortedData, setSortedData] = useState([...projectData].sort((a, b) => { // Sort data in descending order by default
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateB - dateA;
    }));

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
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sorted = [...sortedData].sort((a, b) => {
            const dateA = new Date(a.date.split('-').reverse().join('-'));
            const dateB = new Date(b.date.split('-').reverse().join('-'));
            return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setSortedData(sorted);
        setSortOrder(newSortOrder);
    };

    return (
        <div className={"detailview-container"}>
            <div className="header t-t-left">
                <h2>Detail view: Biased project decisions</h2>
                <InfoButton title="What is this?"
                            tooltip={"This is a detailed overview of decisions that were flagged as biased, their outcome, and the reasoning for the choice made."}/>
            </div>

        <div className="project-list-container">
            <div className="project-list-header">
                <div className="project-list-row">
                    <div className="project-list-cell sort-dv"
                         onClick={handleSort}>Date {sortOrder === 'asc' ? '▲' : '▼'}</div>
                    <div className="project-list-cell smaller">Project</div>
                    <div className="project-list-cell">Decision</div>
                    <div className="project-list-cell">Suspected Bias</div>
                    <div className="project-list-cell ">Outcome</div>
                    <div className="project-list-cell bigger">Description</div>
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
                                        <a href={project.reportLink} onClick={(e) => handleBiasClick(bias, e)}>{bias}</a>;
                                    </div>
                                ))}
                            </div>
                            <div className="project-list-cell ">{project.outcome} <br/>(<a href={project.reportLink}>see
                                report</a>)
                            </div>
                            <div className="project-list-cell bigger">{project.details}</div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProject && <ProjectDetail project={selectedProject} onClose={handleClose}/>}
            {selectedBias && <BiasDetail bias={selectedBias} onClose={handleClose}/>}
        </div>
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
            {/*{isHovered && <div className="glance-tooltip-content">{tooltipText}</div>}*/}
        </div>
    );
};


const ProjectDetail = ({ project, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Decision {project.project} (Tech Integration Project)</h2>
                <p><strong>Project Description:</strong><i> {project.description} </i></p>
                <p><i>{project.context} Of the set milestones, {project.currentMilestone} of {project.totalMilestones} are completed.</i></p>
                <br/>
                <p><strong>Date:</strong> {project.date}</p>
                <p><strong>Decision:</strong> {project.decision} ["<i>{project.comment}</i>"]</p>
                <p><strong>Outcome:</strong> {project.outcome}: {project.details}</p>
                <p><strong>Suspected Biases:</strong> {project.suspectedBias.join(", ")}</p>
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
                <p>For more details, see the info-box at the bottom right of the screen.</p>
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