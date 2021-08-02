import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import './Chat.css'
import Friends from './Friends.js'
import Rooms from './Rooms.js'


let socket;
const Chat = ({ logOut, username }) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [activeChannel, setActiveChannel] = useState({messages:[]});

    const ENDPOINT = 'http://localhost:80';

    useEffect(() => {
        setMessages(activeChannel.messages)
    }, [activeChannel])

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
        socket.on('initialize', data => {
            console.log(data);
            setRooms(data.rooms);
            let publicRoom = data.rooms.find(room => room.public)
            setActiveChannel(publicRoom);
        })

        socket.emit('initialize', username)

        socket.on('message', message => {
            setMessages([...messages, message]);
            console.log('incoming message: ' + message)
        })

    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        setMessages([...messages, message]);
        if (message) {
            socket.emit('message', {
                text: message,
                author: username,
                room: activeChannel._id,
                directChannel: activeChannel.directChannel
            }, () => setMessage(''));
        }
    }

    const clickAR = () => console.log(activeChannel)
    const clickM = () => console.log(messages);

    return (
        <div className="outer">
            <button onClick={clickAR}>active channel</button>
            <button onClick={clickM}>messages</button>
            <div className='chat'>
                <Friends />
                <div className="centerChat">
                    <div className="myName">
                        <div className='username'>{username}</div>
                        <div>{activeChannel.users} </div>
                        <button onClick={logOut}>log out</button>
                    </div>
                    <div className="allText">
                        {messages.map(message => (
                            <div>
                                {message.text + ' ' + `[${message.author}]` }
                            </div>
                        ))}
                    </div>
                    <div className="myText">
                        <input
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                        />
                    </div>
                </div>
                <Rooms rooms={rooms} />
            </div>
        </div>
    )
}

export default Chat;