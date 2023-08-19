import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';
import './ReadingPassage.css';
import { useParams } from 'react-router-dom';
import { tests } from './data';

function ReadingPassage() {
    const { id } = useParams();

    // Use the 'id' to fetch or display the data for this specific test.
    // For example, you can find the test using the id from your `tests` array.

    const selectedTest = tests.find(test => test.id === parseInt(id));

    // For right-click highlighting
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

    const handleRightClick = (e) => {
        e.preventDefault();

        const selectedText = window.getSelection().toString();
        if (selectedText) {
            setContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY
            });
        }
    };

    const highlightText = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
    
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
    
        range.surroundContents(span);
        selection.removeAllRanges();
    
        setContextMenu({ visible: false });
    };
    

    const removeHighlight = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
    
        const range = selection.getRangeAt(0);
        const parentElement = range.commonAncestorContainer.parentElement;
    
        // Check if parent element is our highlight span
        if (parentElement && parentElement.style.backgroundColor === 'yellow') {
            const spanContent = parentElement.innerHTML;
            parentElement.outerHTML = spanContent;
        }
    
        selection.removeAllRanges();
        setContextMenu({ visible: false });
    };
    

    // For navigating passages with titles
    const [currentPassage, setCurrentPassage] = useState(0);
    const passages = [
        {
            title: "Title for Passage 1",
            content: `
            <p><em><span style="font-size: large;">In Paris, urban farmers are trying a soil-free approach to agriculture that uses less space and fewer resources. Could it help cities face the threats to our food supplies?</span></em></p>
            <p><span style="font-size: large;">On top of a striking new exhibition hall in southern Paris, the world’s largest urban rooftop farm has started to bear fruit. Strawberries that are small, intensely flavoured and resplendently red sprout abundantly from large plastic <span class="highlighter--deleted" data-highlight-id="5" style="background-color: inherit; color: inherit;">tubes</span>. Peer inside and you see the tubes are completely hollow, the roots of dozens of strawberry plants dangling down inside them. From identical <span class="highlighter--deleted" data-highlight-id="6" style="background-color: inherit; color: inherit;">vertical tubes</span> nearby burst row upon row of lettuces; near those are aromatic herbs, such as basil, sage and peppermint. Opposite, in narrow, horizontal trays packed not with soil but with coconut fibre, grow cherry tomatoes, shiny aubergines and brightly coloured chards.</span></p>
            <span style="font-size: large;">Pascal Hardy, an engineer and sustainable development consultant, began experimenting with vertical farming and aeroponic growing towers- as the soil-free plastic tubes are known – on his Paris apartment block roof five years ago. The urban rooftop space above the exhibition hall is somewhat bigger: 14,000 square metres and almost exactly the size of a couple of football pitches. Already, the team of young urban farmers who tend it have picked, in one day, 3,000 lettuces and 150 punnets of strawberries. When the remaining two thirds of the vast open area are in production, 20 staff will harvest up to 1,000 kg of perhaps 35 different varieties of fruit and vegetables, every day. ‘We’re not ever, obviously, going to feed the whole city this way,’ cautions Hardy. ‘In the urban environment you’re working with very significant practical constraints, clearly, on what you can do and where. But if enough unused space can be developed like this, there’s no reason why you shouldn’t eventually target maybe between 5% and 10% of consumption.’</span>
            <span style="font-size: large;">Perhaps most significantly, however, this is a real-life showcase for the work of Hardy’s flourishing urban agriculture consultancy, Agripolis, which is currently fielding enquiries from around the world to design, build and equip a new breed of soil-free inner-city farm. ‘The method’s advantages are many,’ he says. ‘First, I don’t much like the fact that most of the fruit and vegetables we eat have been treated with something like 17 different pesticides, or that the intensive farming techniques that produced them are such huge generators of greenhouse gases. I don’t much like the fact, either, that they’ve travelled an average of 2,000 refrigerated kilometres to my plate, that their quality is so poor, because the varieties are selected for their capacity to withstand such substantial journeys, or that 80% of the price I pay goes to wholesalers and transport companies, not the producers.’</span>
            `,
            question: `
            <h3><em><span style="font-size: x-large;"><strong>Questions 1-3</strong></span></em></h3>
            <p><span style="font-size: large;"><strong></strong></span></p>
            <h3><span style="font-size: large;"><em>Complete the sentences below.</em></span></h3>
            <p><span style="font-size: large;"><em>Choose <strong>NO MORE THAN TWO WORDS ANDIOR A NUMBER</strong> from the passage for each answer.</em></span></p>
            <p><span style="font-size: large;"><em>Write your answers in boxes 1-3 on your answer sheet.</em></span></p>
            <h3 style="text-align: center;"><span style="font-size: x-large;"><strong>Urban farming in Paris</strong></span></h3>
            <p><span style="font-size: large;"><strong>2</strong>&nbsp; &nbsp;There will eventually be a daily harvest of as much as …………………… in weight of fruit and vegetables.</span></p>
            <p><span style="font-size: large;"><strong>2</strong>&nbsp; &nbsp;There will eventually be a daily harvest of as much as …………………… in weight of fruit and vegetables.</span></p>
            <p><span style="font-size: large;"><strong>3</strong>&nbsp; &nbsp;It may be possible that the farm’s produce will account for as much as 10% of the city’s …………………… overall.</span></p>
            <p><span style="font-size: large;"><strong></strong></span></p>
            `
        },
        {
            title: "Title for Passage 2",
            content: "<p>Coffee, another popular beverage...</p>"
        },
        {
            title: "Title for Passage 3",
            content: "<p>Water, the most consumed drink...</p>"
        }
    ];
    
    

    const changePassage = (direction) => {
        if (direction === "prev" && currentPassage > 0) {
            setCurrentPassage(currentPassage - 1);
        } else if (direction === "next" && currentPassage < 2) {
            setCurrentPassage(currentPassage + 1);
        }
    };

    const handleNextAction = () => {
        if (currentPassage < 2) {
            changePassage("next");
        } else {
            setShowResults(true);
        }
    };

    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState(Array(40).fill(""));

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };
    

    return (
        <div className="reading-passage" onContextMenu={handleRightClick}>
            <div className="main-section">
                <div className="timer-container">
                    <CountdownTimer />
                </div>
                <div className="content-section">
                    <div className="passage-section">
                        <h2>{passages[currentPassage].title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: passages[currentPassage].content }}></div>
                    </div>
                    <div className="questions-section">
                        <div dangerouslySetInnerHTML={{ __html: passages[currentPassage].question }}></div>
                    </div>
                </div>
                {contextMenu.visible && (
                    <div 
                        style={{ 
                            position: 'absolute', 
                            top: `${contextMenu.y}px`, 
                            left: `${contextMenu.x}px`, 
                            backgroundColor: 'white', 
                            border: '1px solid black', 
                            zIndex: 1000 
                        }}
                    >
                        <button onClick={highlightText}>Highlight</button>
                        <button onClick={removeHighlight}>Remove Highlight</button>
                    </div>
                )}
                <div className="passage-navigation">
                    <button disabled={currentPassage === 0} onClick={() => changePassage("prev")}>Previous Passage</button>
                    <span>Passage {currentPassage + 1} of 3</span>
                    <button onClick={handleNextAction}>
                        {currentPassage < 2 ? "Next Passage" : "View Result"}
                    </button>
                </div>
                {showResults && (
                    <div className="results-popup">
                        <h3>Your Results</h3>
                        <div className="results-grid">
                            {[...Array(40)].map((_, idx) => (
                                <div key={idx} className="result-item">Question {idx + 1}: Correct/Incorrect</div>
                            ))}
                        </div>
                        <button onClick={() => setShowResults(false)}>Close</button>
                    </div>
                )}
            </div>        

            {/* New Answer Section */}
            <div className="answer-section">
                <h4>Fill Answers</h4>
                {answers.map((answer, idx) => (
                    <input 
                        key={idx} 
                        type="text" 
                        value={answer}
                        onChange={e => handleAnswerChange(idx, e.target.value)}
                        placeholder={`Answer ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ReadingPassage;
