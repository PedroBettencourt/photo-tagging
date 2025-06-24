import { useState } from "react";
import cat from "./assets/cat.jpg"
import { dot, menu } from "./App.module.css";

function Click({ dimensions, coords, characters }) {

    const width_dot = 3;    
    const width_box = 12;
    const size_img = dimensions.width;
    
    const x = `calc(${coords.x}px - ${width_dot/2}vw)`;
    const y = `calc(${coords.y}px - ${width_dot/2}vw)`;
    
    let x_menu = `calc(${coords.x}px + ${width_dot}vw)`;
    let y_menu = `calc(${coords.y}px - ${width_dot/2}vw)`;
    
    // Place the box on the left side when there's no space
    if (coords.x > size_img - 85) x_menu = `calc(${coords.x}px + ${width_dot - width_box}vw)`;

    // Place the box on top when there's no space
    if (coords.y > size_img - 50) y_menu = `calc(${coords.y}px - ${width_dot*2.5}vw)`;

    return (
        <>
          <div id="dot" className={dot} style={{ left: x, top: y }}></div>
          <ul id="box" className={menu} style={{ left: x_menu, top: y_menu }}>
              { characters.map(chr => (
                <li>Xx { chr.name }</li>
              ))}
          </ul>
        </>
    );
};

function App() {

    const [click, setClick] = useState(false);
    const [dimensions, setDimensions] = useState(null);
    const [coords, setCoords] = useState(null);
    const [characters, setCharacters] = useState([{ name: "cat" }, { name: "dog" }]);

    function handleLoad(e) {
        const {width, height} = (e.nativeEvent.srcElement);
        setDimensions({ width: width, height: height });
    }

    function handleClick(e) {
        if (!click) {
            setCoords({ x: e.pageX, y: e.pageY });
            setClick(true);
        } else setClick(false);
    };

    return (
        <div>
            <img onLoad={handleLoad} onClick={ handleClick } src={ cat } alt="cat" />
            {click && <Click dimensions={dimensions} coords={coords} characters={characters} />}
        </div>
    );
};

export default App;