import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import './Chat.css'
import Friends from './Friends.js'
import Rooms from './Rooms.js'


let socket;
const Chat = ({ logOut, username }) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://localhost:443';

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join', () => {

        })

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [ENDPOINT])


    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log('inside chat');

    return (
        <div className="outer">
            <div className='chat'>
                <Friends />
                <div className="centerChat">
                    <div className="myName">
                        <div className='username'>{username}</div>
                        <button onClick={logOut}>log out</button>
                    </div>
                    <div className="allText">

                    </div>
                    <div className="myText">
                        <input
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                        />
                    </div>
                </div>
                <Rooms />
            </div>
        </div>
    )
}

export default Chat;