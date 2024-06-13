import React, { useState } from 'react';
import "./App.css";
import "monday-ui-react-core/dist/main.css";

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
            <div className="info-box-header">
                <button onClick={prevBias}>&lt;</button>
                <h2>{currentBias.title}</h2>
                <button onClick={nextBias}>&gt;</button>
                <InfoButton title="Title" tooltip={"text"}/>
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
                    <h3>Example</h3>
                    <div className="options">
                        <div className="option one">
                            <h4>{currentBias.example.optionOne.title}</h4>
                            {currentBias.example.optionOne.details.map((detail, index) => (
                                <p key={index}>• {detail}</p>
                            ))}
                            <p>{currentBias.example.optionOne.description}</p>
                        </div>
                        <div className="vs">vs</div>
                        <div className="option two">
                            <h4>{currentBias.example.optionTwo.title}</h4>
                            {currentBias.example.optionTwo.details.map((detail, index) => (
                                <p key={index}>• {detail}</p>
                            ))}
                            <p>{currentBias.example.optionTwo.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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

const App = () => {
    return (
        <div>
            <InfoBox />
        </div>
    );
};

export default App;
