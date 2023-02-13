import {useState, useEffect} from 'react';

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'https://i.imgflip.com/1bij.jpg'
    });
    const [allMemes, setAllMemes] = useState([]);
    useEffect(() => {
        const getMemes = async() => {
            const res = await fetch('https://api.imgflip.com/get_memes');
            const data = await res.json();
            setAllMemes(data.data.memes);
        };
        getMemes();
    }, []);
    const handleClick = () => {
        setMeme(prev => ({
            ...prev,
            randomImage: allMemes[Math.floor(Math.random() * allMemes.length)].url
        }));
    };
    const handleChange = ({target}) => setMeme(prev => ({
        ...prev,
        [target.name]: target.value.toUpperCase()
    }));
    return (
        <div>
            <div id="inputs">
                <input type="text" name='topText' placeholder="Top Text" onChange={handleChange} value={meme.topText}/>
                <input type="text" name='bottomText' placeholder="Bottom Text" onChange={handleChange} value={meme.bottomText}/>
            </div>
            <button id="submit" onClick={handleClick}>Get a new meme image  🖼</button>
            <div id='relative'>
                <img src={meme.randomImage} alt="failed to load :(" id="meme"/>
                <p id='p1'>{meme.topText}</p>
                <p id='p2'>{meme.bottomText}</p>
            </div>
        </div>
    );
}
