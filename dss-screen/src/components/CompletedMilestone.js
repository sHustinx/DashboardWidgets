import React from 'react';
import completedMilestone from '../assets/completed.svg';


const CompletedMilestone = () => {
    return (
        <div className="milestone completed">

            <img src={completedMilestone} alt="Completed Milestone" />
        </div>
    );
};

export default CompletedMilestone;
