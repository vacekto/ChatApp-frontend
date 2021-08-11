import { useState, useEffect } from 'react';

const Modal = ({ socket, modalAction, setModalOpen, username, id }) => {
    const [usersInRoom, setUsersInRoom] = useState([{ username, _id: id }]);
    const [options, setOptions] = useState([]);
    const [usernameSearch, setUsernameSearch] = useState('');
    const [timer, setTimer] = useState(null);
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        if (usernameSearch) fetchUsers()
    }, [usernameSearch])

    const fetchUsers = () => {
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(() => {
            socket.emit('searchForUser', usernameSearch, result => {
                if (result.status === 'ok') {
                    const data = result.data.filter(user => user.username !== username)
                    setOptions(data)
                }
                else console.error(result.error)
            })
        }, 200))
    };

    const addToRoom = () => {
        let user = options.find(user => user.username === usernameSearch)
        if (user && !usersInRoom.some(user => user.username === usernameSearch)) {
            setUsersInRoom(prevstate => [...prevstate, user])
        }
    }

    const createRoom = () => {
        if (roomName && usersInRoom.length > 1) {
            socket.emit('createRoom', { roomName, users: usersInRoom })
        }
    }

    return (
        <div className='modalBackground' onClick={() => setModalOpen(false)}>
            <div className="modalWrapper">
                <div className='modal' onClick={e => e.stopPropagation()}>
                    <h3>Create room</h3>
                    <div className="modalUsers">
                        <div className="modalUsersInput">
                            <div>find user:</div>
                            <input
                                list="options"
                                name="option"
                                value={usernameSearch}
                                onChange={(e) => { setUsernameSearch(e.target.value) }}
                                onKeyPress={e => e.key === 'Enter' ? null : null}
                            />
                            <datalist id="options">
                                {options.map(user => (
                                    <option value={user.username} key={user._id} />
                                ))}
                            </datalist>
                            <button onClick={() => addToRoom()}>add user</button>
                        </div>
                        <div className="modalUsersInRoomList">
                            <div style={{ margin: "0 20px" }}>Users in room:</div>
                            <div className="list">
                                {usersInRoom.map(user => {
                                    console.log(user); return (
                                        <div key={user._id}>{user.username}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="modalRoomName">
                        <div>room name:</div>
                        <input type="text" onChange={(e) => setRoomName(e.target.value)} value={roomName} />
                        <button onClick={createRoom}>Create room</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Modal