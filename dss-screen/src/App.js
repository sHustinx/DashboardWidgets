import React from "react";
import {useState, useEffect} from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import CompletedMilestone from './components/CompletedMilestone';
import IncompleteMilestone from './components/IncompleteMilestone';
import InfoButton from './components/InfoButton';
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";
import MilestoneTracker from "./components/Milestone";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();
const rationalOption = 'stop';
const GlanceTooltip = ({text, tooltipText, className}) => {
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



function Overview() {
    return (
        <div className="">

            <div className="project-description">
                <h2>Project Description</h2>
                <p>
                    This project develops a new mobile app, which would significantly <strong>improve the user
                    experience</strong>, and could generate a <strong>potential revenue of 100k€.</strong> The project
                    has <strong>faced some complications</strong> and initial user tests have indicated some <strong>performance
                    and security issues</strong> that still need addressing. The involved stakeholders <strong>have
                    asked for a re-evaluation</strong> on whether to stop or continue the project.
                </p>
            </div>
            <div className="decision-context">
                <h2>Decision Context</h2>
                <p>
                    The project is currently <strong>10k€ over budget</strong> (10k€ over budget of 40k€), and <strong>2
                    months delayed</strong> (2 months over initial 10 month timeframe). <strong>Continuing the
                    project</strong> would involve an additional investment of 25k€ and a project extension of 2 months
                    with an estimated 80% chance of failure and a 20% chance of success. <strong>Stopping the
                    project</strong> would involve no additional costs or potential revenue.
                </p>
            </div>

            <MilestoneTracker/>
            <div className="project-at-a-glance">
                <h2>Project at a glance:</h2>
                {/*<span className="tag over-time">over time</span>
          <span className="tag over-budget">over budget</span>
          <span className="tag high-priority">high priority</span>
          <span className="tag tech-domain">tech-domain</span>
          <span className="tag team-39b">team 39b</span>
          <span className="tag being-re-evaluated">being re-evaluated</span>*/}
                <div className="tags">
                    <GlanceTooltip text="over time" tooltipText="Project is currently 2 months behind schedule"
                                   className="tag over-time"/>
                    <GlanceTooltip text="over budget" tooltipText="Project has exceeded the budget by 10k€"
                                   className="tag over-budget"/>
                    <GlanceTooltip text="high priority" tooltipText="Project is classified as high priority"
                                   className="tag high-priority"/>
                    <GlanceTooltip text="tech-domain"
                                   tooltipText="Project is related to the technology domain (IT & Infrastructure)"
                                   className="tag tech-domain"/>
                    <GlanceTooltip text="team 39b" tooltipText="Project is carried out by project team 39b"
                                   className="tag team-39b"/>
                    <GlanceTooltip text="being re-evaluated" tooltipText="Project is currently under re-evaluation"
                                   className="tag being-re-evaluated"/>
                </div>
            </div>
        </div>
    );
}




const Overlay = ({ feedback, title, message, bottomMessage, onClose, onConfirm }) => {
    //const Buttons = feedback ? ReconsiderButtons : CloseButton;

    return (
        <div className="overlay">
            <div className="overlay-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <p>{bottomMessage}</p>
                {feedback ? <div><button onClick={onConfirm}>Confirm Decision</button><button id={"reconsider"} onClick={onClose}>Reconsider Options</button></div> : <div><button onClick={onClose}>Close</button></div>}
            </div>
        </div>
    );
};

function Decision() {
    const [comment, setComment] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [selectedOption, setSelectedOption] = useState('stop'); // Set 'stop' as the initial selected option
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [overlayMessage, setOverlayMessage] = useState('');
    const [overlayMessageBottom, setOverlayMessageBottom] = useState('');
    const [overlayTitle, setOverlayTitle] = useState('');
    const [feedback, setFeedback] = useState(false);

    const handleSubmit = () => {
        if (confirm && selectedOption && comment) {
            //alert(`Decision: ${selectedOption}\nComment: ${comment}`);
            if (selectedOption === rationalOption){
                setOverlayTitle(`Decision Submitted`);
                setOverlayMessage(`Your decision has been successfully submitted.`); //${selectedOption}\\nComment: ${comment}\
                setOverlayMessageBottom(`Recommendation: ${selectedOption} project (${comment})`);
                setFeedback(false);
                setOverlayVisible(true);
            }
            else{
                setOverlayTitle(`Reflection Suggestion`);
                setOverlayMessage(`Based on current project calculations and your decision-history, your decision 
                                            might be influenced by loss-aversion and sunk-cost bias. 
                                            This describes a tendency for people to irrationally continue a course of action after previous high investments in it, even though abandoning it might be more beneficial.
                                            Such biases can enable risk-seeking behaviour in financial decisions.`); //${selectedOption}\\nComment: ${comment}\
                setOverlayMessageBottom(`Do you want to reconsider your decision?`);
                setFeedback(true);
                setOverlayVisible(true);
            }

        } else {
            alert('Please fill out all fields to confirm your decision.');
        }
    };

    const handleSave = () => {
        if (selectedOption && comment) {
            setOverlayTitle(`Decision Saved`);
            setOverlayMessage(`Your decision has been successfully saved.`); //${selectedOption}\\nComment: ${comment}\
            setOverlayMessageBottom(``);
            setFeedback(false);
            setOverlayVisible(true);
            //alert(`Decision: ${selectedOption}\nComment: ${comment}`);
        } else {
            alert('Please fill out a comment to save your decision.');
        }
    };

    const handleCloseOverlay = () => {
        setOverlayVisible(false);
        setOverlayMessage('');
        setOverlayTitle('');
        setOverlayMessageBottom('');
        setFeedback(false);
    };

    return (
        <div>
            {overlayVisible && <Overlay feedback={feedback} title={overlayTitle} message={overlayMessage} bottomMessage={overlayMessageBottom} onClose={handleCloseOverlay} onConfirm={handleSave}/>}
            <div className="decision">
                <div className="option stop">
                    <input
                        type="radio"
                        id="stop"
                        name="decision"
                        value="stop"
                        checked={selectedOption === 'stop'}
                        onChange={() => setSelectedOption('stop')}
                    />
                    <div className="decision-box-content">
                        <label htmlFor="stop">
                            <h3 className="header">STOP PROJECT
                                <InfoButton title="Why is this option pre-selected?"
                                            tooltip={"This option was pre-selected as a smart default, because \n" +
                                                "it appears to be the most rational choice based on the \n" +
                                                "current project calculations and your past decision history.\n" +
                                                "\n"}/>
                            </h3>
                            <h5>Give recommendation to stop the project</h5>
                            <table>
                                <tbody>
                                <tr>
                                    <th>costs:</th>
                                    <td>-50k€ prev. investments</td>
                                </tr>
                                <tr>
                                    <th>time:</th>
                                    <td>no additional time spent</td>
                                </tr>
                                <tr>
                                    <th>revenue:</th>
                                    <td>0€</td>
                                </tr>
                                <tr>
                                    <th>risk-estimations:</th>
                                    <td>100% project failure, 0% project success</td>
                                </tr>
                                </tbody>
                            </table>
                        </label>
                    </div>
                </div>
                <div className="option continue">
                    <input
                        type="radio"
                        id="continue"
                        name="decision"
                        value="continue"
                        checked={selectedOption === 'continue'}
                        onChange={() => setSelectedOption('continue')}
                    />
                    <div className="decision-box-content">
                        <label htmlFor="continue">
                            <h3>CONTINUE PROJECT</h3>
                            <h5>Give recommendation to re-invest</h5>
                            <table>
                                <tbody>
                                <tr>
                                    <th>costs:</th>
                                    <td>-50k€ prev. investments and -25k€ new investments</td>
                                </tr>
                                <tr>
                                    <th>time:</th>
                                    <td>+2 months time spent</td>
                                </tr>
                                <tr>
                                    <th>revenue:</th>
                                    <td>100k€ potential revenue</td>
                                </tr>
                                <tr>
                                    <th>risk-estimations:</th>
                                    <td>80% project failure, <br/>20% project success</td>
                                </tr>
                                </tbody>
                            </table>
                        </label>
                    </div>
                </div>
            </div>
            <div className="comment" >
                <textarea

                    id="comment"
                    placeholder="Please provide a short (1-2 sentences) comment explaining your reasoning for the decision"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>

            </div>
            <div className="submit">
                <div>
                    <input
                        type="checkbox"
                        id="confirm"
                        name="confirm"
                        checked={confirm}
                        onChange={() => setConfirm(!confirm)}
                    />

                    <label htmlFor="confirm">
                        I have considered the alternatives carefully and made an informed decision
                    </label>
                </div>
                <button id="submit-decision" onClick={handleSubmit}>
                    Submit Decision
                </button>
                <button id="save-decision" onClick={handleSave}>
                    Save Decision
                </button>
            </div>
        </div>
    );
}

const App = () => {
    const [context, setContext] = useState();

    return (
        <div className="App">
            <div className="container header bg-highlight-color">
                <h1>Overview: Mobile-App Project </h1>
                <InfoButton title="What is the goal of this decision
support system?" tooltip={"The goal of this system is to aid project managers in high-risk\n" +
                    "decisions, by providing an overview of the most relevant data \n" +
                    "and helping them make more rational decisions. "}/>
            </div>

            <div className="container">
                <Overview/>
                <Decision/>
            </div>
        </div>
    );
};

export default App;
