import React, { useState } from 'react';



const InfoButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="info-button"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="info-icon">?</span>
            {isHovered && <div className="tooltip">This is additional information.</div>}
        </div>
    );
};

export default InfoButton;