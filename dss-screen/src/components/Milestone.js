import React, { useState } from 'react';
import { ReactComponent as NotCompletedIcon } from '../assets/notcompleted.svg';
import { ReactComponent as CompletedIcon } from '../assets/completed.svg';
import { ReactComponent as DividerIcon } from '../assets/divider.svg';
import CompletedMilestone from "./CompletedMilestone";
import IncompleteMilestone from "./IncompleteMilestone";

const Timeline = () => {
    return (
        <svg className="timeline" width="100%" height="10">
            <line x1="0" y1="5" x2="100%" y2="5" style={{stroke: 'lightgrey', strokeWidth: 10}}/>
        </svg>
    );
};

const Milestone = ({ number, completed, tooltip}) => {
    const Icon = completed ? CompletedIcon : NotCompletedIcon;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`milestone ${completed ? 'completed' : 'incomplete'}`} onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>

            <div className="milestone-number">{number}</div>
            {isHovered && <div className="glance-tooltip-content ms">{tooltip}</div>}
            <Icon />
        </div>
    );
};

const Divider = ({ text }) => {
    return (
        <div className={`milestone divider`}>
            <div className="milestone-number">{text}</div>
            <DividerIcon />
        </div>
    );
};

const MilestoneTracker = () => {
    return (
        <div className="milestones">
            <h2>Milestones (4/6 completed)</h2>

            <div className="milestone-bar">
                <Timeline />
                <Milestone number="M1" completed tooltip="Completed Milestone 1" />
                <Milestone number="M2" completed tooltip="Completed Milestone 2" />
                <Milestone number="M3" completed tooltip="Completed Milestone 3" />
                <Milestone number="M4" completed tooltip="Completed Milestone 4" />
                <Divider text="current point"/>
                <Milestone number="M5" completed={false} tooltip="Completed Milestone 5" />
                <Milestone number="M6" completed={false} tooltip="Completed Milestone 6" />
            </div>
        </div>
    );
};

export default MilestoneTracker;
