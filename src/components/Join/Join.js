import { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
    const [action, setAction] = useState('logIn')
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const toggleAction = () => {
        console.log(action);
        action === 'logIn' ? setAction('signIn') : setAction('logIn');
    }

    return (
        <div className="wrapper">
            <h1>Application</h1>
            <button onClick={() => console.log(action)}> test </button>
            <button onClick={toggleAction}>cosikdesitlacitko</button>
            <h1 className="heading">{action}</h1>
            <div><input placeholder="" className='joinInput' type='text' onChange={event => setName(event.target.value)} /></div>
            <div><input placeholder="" className='joinInput mt-20' type='text' onChange={event => setRoom(event.target.value)} /></div>
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button className="button mt-20" type="submit">Sign In</button>
            </Link>
        </div>
    )
}

export default Join;