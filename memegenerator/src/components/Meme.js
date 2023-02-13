import {useState, useEffect} from 'react';
import Text from './Text';

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'https://i.imgflip.com/1bij.jpg'
    });
    const [allMemes, setAllMemes] = useState([]);
    const [topY, setTopY] = useState(220);
    const [topX, setTopX] = useState(50);
    const [bottomY, setBottomY] = useState(525);
    const [bottomX, setBottomX] = useState(50);
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
    const handleDown = position => {
        if (position === 'top') {
            setTopY(prev => prev+5);
        } else {
            setBottomY(prev => prev+5);
        }
    };
    const handleUp = position => {
        if (position === 'top') {
            setTopY(prev => prev-5);
        } else {
            setBottomY(prev => prev-5);
        }
    };
    const handleRight = position => {
        if (position === 'top') {
            setTopX(prev => prev+1);
        } else {
            setBottomX(prev => prev+1);
        }
    };
    const handleLeft = position => {
        if (position === 'top') {
            setTopX(prev => prev-1);
        } else {
            setBottomX(prev => prev-1);
        }
    };
    return (
        <div>
            <div id="inputs">
                <input type="text" name='topText' placeholder="Top Text" onChange={handleChange} value={meme.topText}/>
                <input type="text" name='bottomText' placeholder="Bottom Text" onChange={handleChange} value={meme.bottomText}/>
            </div>
            <button id="submit" onClick={handleClick}>Get a new meme image  🖼</button>
            <img src={meme.randomImage} alt="failed to load :(" id="meme"/>
            <Text text={meme.topText} yOffset={topY} xOffset={topX} position='top' down={handleDown} up={handleUp} right={handleRight} left={handleLeft}/>
            <Text text={meme.bottomText} yOffset={bottomY} xOffset={bottomX} position='bottom' down={handleDown} up={handleUp} right={handleRight} left={handleLeft}/>
        </div>
    );
}
