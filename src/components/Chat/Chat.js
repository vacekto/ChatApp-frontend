import { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'
import Friends from './Friends.js'
import Rooms from './Rooms.js'


let socket;
console.log('outside chat');
const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { room, name } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, () => {

        })
        setName(name)
        setRoom(room)

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [ENDPOINT, location.search])


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