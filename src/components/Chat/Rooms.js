const Rooms = ({ rooms, setActiveChannel }) => {
    return (
        <div className='rooms'>
            {rooms.map((room, index) => (
                <div key={room._id} className='room' onClick={() => setActiveChannel({ ...room })}>{room.name}</div>
            ))}
        </div>
    )
}

export default Rooms