import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

//other notes

function App(props) {
    const [counts, setCounts] = useState([0,0,0,0,0]);
    const [total, setTotal] = useState(0);

    function handleClick(evt, i) {
        const copy = counts.slice()
        copy[i] = i
        setCounts(copy)
        const newTotal = counts.reduce((t, cur) => {
            return t+cur
        }, 0)
        setTotal(newTotal)
    }

    const clickers = counts.map((count, i) => {
        return <Clicker key={i} f={evt => handleClick(evt, i)} count={count}/>
    })
    return (
        <div>
            {clickers}
            <Total val={total} />
        </div>
    )
}

function Total(props) {
    return (
        <h2>= {props.val}</h2>
    )
}


function Clicker(props) {
    //use state - single arg: value of state -- returns [val, function to set the value]
    

    return (
        <div onClick={props.f} className='clicker'>
            {props.count}
        </div>

    )
}


root.render(
    //<div><MyComponent name="Jacob"/><MyComponent name="Joe"/></div>
    <div><App /></div>
)