import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import UsersInRoom from './UsersInRoom.js';
import RoomList from './Rooms.js';
import Modal from './Modal.js';


let socket;
const Chat = ({ logOut, username, messages, setMessages, rooms, setRooms, activeChannel, setActiveChannel, id }) => {
    const [message, setMessage] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('create_room');
    const ENDPOINT = 'http://localhost:80';

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            const newMessage = {
                text: message,
                author: username,
                room: activeChannel._id,
                directChannel: activeChannel.directChannel
            }
            console.log(newMessage)
            socket.emit('message', newMessage, response => {
                setMessage('')
                if (response.status === 'error') console.log(response);
            });
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT);
    }, [ENDPOINT])

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        setMessages([...activeChannel.messages])
    }, [activeChannel])

    useEffect(() => {
        console.log('INITIALIZE')
        console.log(rooms, id)
        socket.emit('initialize', { rooms, id })
        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('newRoom', response => {
            setRooms(rooms => [...rooms, response.room])
        })
        socket.on('message', newMessage => {
            const room = rooms.find(room => room._id === newMessage.room);
            room.messages.push(newMessage);
            if (activeChannel._id === newMessage.room) {
                setMessages(mssgs => [...mssgs, newMessage]);
            }
        })
        return () => {
            socket.removeAllListeners("newRoom");
            socket.removeAllListeners("message");
        }
    }, [rooms, activeChannel])


    return (
        <div className="outer">
            {modalOpen ?
                <Modal
                    id={id}
                    username={username}
                    socket={socket}
                    modalAction={modalAction}
                    setModalOpen={setModalOpen}
                /> :
                null
            }
            <div className='chat'>
                <RoomList
                    setModalOpen={setModalOpen}
                    rooms={rooms.filter(room => !room.directChannel)}
                    setActiveChannel={setActiveChannel}
                />
                <div className="centerChat">
                    <div className="myName">
                        <button onClick={logOut}>log out</button>
                        <div className='username'>{'username: ' + username}</div>
                        <div>{'room:' + activeChannel.name}</div>
                    </div>
                    <div className='allTextWrapper'>
                        <div className="allText">
                            {messages.map(message => (
                                <div key={message._id}>
                                    {message.text + ' ' + `[${message.author}]`}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="myText">
                        <input
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                        />
                    </div>
                </div>
                <UsersInRoom users={activeChannel.users} />
            </div>
        </div >
    )
}

export default Chat;