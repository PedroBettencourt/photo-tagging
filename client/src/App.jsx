import React, { useEffect, useState } from "react";
import painting from "./assets/painting.jpg"
import man from "./assets/man.jpg";
import bears from "./assets/bears.jpg";
import devil from "./assets/devil.jpg";
import { fullImage, dot, menu, characterImgs, clickedClass, answerClass } from "./App.module.css";

function Click({ dimensions, coords, characters, setClick, setChosen }) {

    const width_dot = 50;    
    const width_box = 160;
    const width_img = dimensions.width;
    const height_img = dimensions.height;
    
    const x = `calc(${coords.x}px - ${width_dot/2}px)`;
    const y = `calc(${coords.y}px - ${width_dot/2}px)`;
    
    let x_menu = `calc(${coords.x}px + ${width_dot}px)`;
    let y_menu = `calc(${coords.y}px - ${width_dot/2}px)`;
    
    // Place the box on the left side when there's no space
    if (coords.imageX > width_img - 170) x_menu = `calc(${coords.x}px - ${width_box}px)`;

    // Place the box on top when there's no space
    if (coords.imageY > height_img - 180) y_menu = `calc(${coords.y}px - ${width_dot*4.2}px)`;

    function handleClick(name) {
        setClick(false);
        setChosen(name);
    }

    return (
        <>
          <div id="dot" className={dot} style={{ left: x, top: y }}></div>
          <ul id="box" className={menu} style={{ left: x_menu, top: y_menu }}>
              { characters.map(chr => (
                    <>
                        {!chr.clicked &&
                            <li key={chr.name}>
                                <button onClick={() => handleClick(chr.name)}>
                                    <img src={chr.image}></img>
                                    { chr.name }
                                </button>
                            </li>
                        }
                    </>        
              ))}
          </ul>
        </>
    );
};

function Characters({ characters }) {
    return (
        <div>
            <ul className={characterImgs}>
                {characters.map(chr => (
                    <li key={chr.name} className={ chr.clicked ? clickedClass : null }> 
                        { chr.name } 
                        <img src={chr.image}></img> 
                    </li> 
                ))}
            </ul>
        </div>
    )
}

function App() {

    const dimensions = { width: 1280, height: 906 }; // Image dimensions
    const [click, setClick] = useState(false); // For menu to be visible or not
    const [coords, setCoords] = useState(null);
    const [characters, setCharacters] = useState(
        [ { name: "man", image: man, clicked: false }, 
          { name: "bears", image: bears, clicked: false }, 
          { name: "devil", image: devil, clicked: false }]
        );
    const [chosen, setChosen] = useState(null); // After choosing a position and character
    const [answers, setAnswers] = useState([]); // character positions after correctly guessing

    function handleClick(e) {
        if (!click) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Both coords inside the image (the ones sent to the backend) and page (for positioning dot and menu)
            setCoords({ x: e.pageX, y: e.pageY, imageX: x, imageY: y });

            setClick(true);
        } else setClick(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    "http://localhost:3000/",
                    {
                        headers: { "Content-Type": "application/json" },
                        method: "POST",
                        body: JSON.stringify({ name: chosen, x: coords.imageX, y: coords.imageY })
                    });
                const json = await res.json();
                if (json) {
                    const updatedCharacters = characters.map(chr => {
                        chr.name === chosen ? chr.clicked = true : false;
                        return chr;
                    });
                    setCharacters(updatedCharacters);
                    setAnswers([...answers, { name: chosen, x: coords.x, y: coords.y }]);
                }
                setChosen(null);

            } catch(err) {
                console.log(err);
            }
        };

        if (chosen) fetchData();

    }, [chosen]);

    return (
        <>
            { answers.length === 3 && <div>Finish!</div>}
            <Characters characters={characters} />
            <div className={fullImage} style={{ minWidth: dimensions.width }}>
                <img onClick={ handleClick } src={ painting } alt="Netherlandish Proverbs painting"/> 
            </div>
            { answers.length !== 0 && 
                <ul className={ answerClass }>
                    {answers.map(chr => (
                        <li key={chr.character} style={{ left: chr.x, top: chr.y }}></li>
                    ))}
                </ul>
            }
            { click && <Click dimensions={dimensions} coords={coords} characters={characters} setClick={setClick} setChosen={setChosen} />}
        </>
    );
};

export default App;


// IT'S MISSING: FINISH, TIMER
// MARKERS ARE INCORRECT IF ZOOM