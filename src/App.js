import React, { useState } from 'react';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';



const App = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [activeChannel, setActiveChannel] = useState({ messages: [] });
    const [id, setId] = useState('');

    const logIn = (data) => {
        let publicRoom = data.rooms.find(room => room.public);
        setActiveChannel({ ...publicRoom });
        setMessages([...publicRoom.messages]);
        setUsername(data.username);
        setEmail(data.email);
        setRooms([...data.rooms]);
        setId(data._id);
    }

    const logOut = () => {
        setUsername('');
        setEmail('');
        setMessages([]);
        setRooms([]);
        setActiveChannel({ messages: [] })
    }

    return (
        <div>
            {email && username && messages && rooms && activeChannel && id ?
                <Chat logOut={logOut}
                    username={username}
                    messages={messages}
                    setMessages={setMessages}
                    rooms={rooms}
                    setRooms={setRooms}
                    activeChannel={activeChannel}
                    setActiveChannel={setActiveChannel}
                    id={id}
                /> :
                <Join logIn={logIn} />
            }
        </div>
    )
};

export default App;