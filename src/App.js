import React, { useState } from 'react';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';



const App = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const logIn = (name, email) => {
        setUsername(name);
        setEmail(email);
    }

    const logOut = () => {
        setUsername('');
        setEmail('');
    }

    const click = () => console.log(email, username)
    return (
        <div>
            {email && username ?
                <Chat logOut={logOut} username={username} /> :
                <Join logIn={logIn} />
            }
            <button onClick={click}>console</button>

        </div>
    )
};

export default App;