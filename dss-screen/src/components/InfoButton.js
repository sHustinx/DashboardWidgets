import React, { useState } from 'react';



const InfoButton = ({title, tooltip}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="info-button"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="info-icon">?</span>
            {isHovered &&
                <div className="tooltip"><h4>{title}</h4><p>{tooltip}</p></div>}
        </div>
    );
};

export default InfoButton;