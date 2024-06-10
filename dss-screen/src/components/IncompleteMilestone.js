import React from 'react';
import notcompletedMilestone from '../assets/notcompleted.svg';


const IncompleteMilestone = () => {
    return (
        <div className="milestone completed">

            <img src={notcompletedMilestone} alt="Inomplete Milestone"/>
        </div>
    )
};

export default IncompleteMilestone;
