import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import CompletedMilestone from './components/CompletedMilestone';
import IncompleteMilestone from './components/IncompleteMilestone';
import InfoButton from './components/InfoButton';
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();


function Overview() {
  return (
      <div className="">

        <div className="project-description">
          <h2>Project Description</h2>
          <p>
            This project develops a new mobile app, which would significantly improve the user experience, and could generate a potential revenue of 80k€. The project has faced some complications and initial user tests have indicated some performance and security issues that still need addressing. The involved stakeholders have asked for a re-evaluation on whether to stop or continue the project.
          </p>
        </div>
        <div className="decision-context">
          <h2>Decision Context</h2>
          <p>
            The project is currently 25k€ over budget (25k€ over budget of 50k€), and 2 months delayed (2 months over initial 10 month timeframe). Continuing the project would involve an additional investment of 30k€ and a project extension of 2 months with an estimated 70% chance of failure and a 30% chance of success. Stopping the project would involve no additional costs or potential revenue.
          </p>
        </div>
        <div className="milestones">
          <h2>Milestones (4/6 completed)</h2>
          <div className="milestone-bar">
            <CompletedMilestone />
            <CompletedMilestone />
            <CompletedMilestone />
            <CompletedMilestone />
            <IncompleteMilestone />
            <IncompleteMilestone />
          </div>
        </div>
        <div className="project-at-a-glance">
          <h2>Project at a glance:</h2>
          <div className="tags">
            <span className="tag over-time">over time</span>
            <span className="tag over-budget">over budget</span>
            <span className="tag high-priority">high priority</span>
            <span className="tag tech-domain">tech-domain</span>
            <span className="tag team-39b">team 39b</span>
            <span className="tag being-re-evaluated">being re-evaluated</span>
          </div>
        </div>
      </div>
  );
}
function Decision() {
  const [decision, setDecision] = useState('');
  const [comment, setComment] = useState('');
  const [confirm, setConfirm] = useState(false);

  const handleSubmit = () => {
    if (confirm && decision && comment) {
      alert(`Decision: ${decision}\nComment: ${comment}`);
    } else {
      alert('Please fill out all fields and confirm your decision.');
    }
  };

  const handleSave = () => {
    if (confirm && decision && comment) {
      alert(`Decision: ${decision}\nComment: ${comment}`);
    } else {
      alert('Please fill out all fields and confirm your decision.');
    }
  };

  return (
      <div>
      <div className="decision">
        <div className="option stop">
          <h3>STOP PROJECT</h3>
          <p>Give recommendation to stop the project</p>
          <ul>
            <li>costs: -75k€ prev. investments</li>
            <li>time: no additional time spent</li>
            <li>revenue: 0€</li>
            <li>risk estimations: 100% failure, 0% success</li>
          </ul>
          <input
              type="radio"
              id="stop"
              name="decision"
              value="stop"
              onChange={() => setDecision('stop')}
          />
        </div>
        <div className="option continue">
          <h3>CONTINUE PROJECT</h3>
          <p>Give recommendation to re-invest</p>
          <ul>
            <li>costs: -75k€ prev. investments and -30k€ new investments</li>
            <li>time: +2 months time spent</li>
            <li>revenue: 80k€ potential revenue</li>
            <li>risk estimations: 70% failure, 30% success</li>
          </ul>
          <input
              type="radio"
              id="continue"
              name="decision"
              value="continue"
              onChange={() => setDecision('continue')}
          />
        </div>

      </div>
        <div className="comment">
        <textarea
            id="comment"
            placeholder="Please provide a short (1-2 sentences) comment explaining your reasoning for the decision"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        ></textarea>
        </div>
        <div className="submit">
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
          <InfoButton />
        </div>

        <div className="container">
          <Overview />
          <Decision />
        </div>
      </div>
  );
};

export default App;
