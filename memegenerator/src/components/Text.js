import {useState} from 'react';

export default function Text(props) {
    const [display, setDisplay] = useState(false);
    const changeVisibility = () => {
        setDisplay(prev => !prev);
    }
    const down = (e) => {
        props.down(props.position);
        e.target.parentElement.parentElement.style.top = `${props.yOffset}px`;
    };
    const up = (e) => {
        props.up(props.position);
        e.target.parentElement.parentElement.style.top = `${props.yOffset}px`;
    };
    const right = (e) => {
        props.right(props.position);
        e.target.parentElement.parentElement.style.left = `${props.xOffset}%`;
    };
    const left = (e) => {
        props.left(props.position);
        e.target.parentElement.parentElement.style.left = `${props.xOffset}%`;
    };
    return (
        <div className='relative' style={{top: props.position === 'top' ? '220px' : '525px', width: '180px'}}>
            <p onClick={changeVisibility}>{props.text}</p>
            {display && (
                <div className='flex'>
                    <button onClick={up} className='direction'>↑</button>
                    <button onClick={down} className='direction'>↓</button>
                    <button onClick={left} className='direction'>←</button>
                    <button onClick={right} className='direction'>→</button>
                </div>
            )}
        </div>
    );
}
