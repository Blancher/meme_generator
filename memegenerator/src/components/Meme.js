import {useState} from 'react';
import memesData from '../data/memesData.js';

export default function Meme() {
    const [image, setImage] = useState('https://i.imgflip.com/1g8my4.jpg');
    const [top, setTop] = useState('');
    const [bottom, setBottom] = useState('');
    const handleClick = (e) => {
        const memesArray = memesData.data.memes;
        const randomNumber = Math.floor(Math.random() * memesArray.length);
        const {url} = memesArray[randomNumber];
        setImage(url);
    };
    const handleTop = (e) => {
        setTop(e.target.value.toUpperCase());
    }
    const handleBottom = (e) => {
        setBottom(e.target.value.toUpperCase());
    }
    return (
        <div>
            <div id="inputs">
                <input type="text" placeholder="Top Text" onChange={handleTop}/>
                <input type="text" placeholder="Bottom Text" onChange={handleBottom}/>
            </div>
            <button id="submit" onClick={handleClick}>Get a new meme image  🖼</button>
            <div>
                <p id="p1">{top}</p>
                <img src={image} alt="" id="meme"/>
                <p id="p2">{bottom}</p>
            </div>
        </div>
    );
}