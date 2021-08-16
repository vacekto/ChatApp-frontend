const Rooms = ({ rooms, setActiveChannel, setModalOpen }) => {
    return (
        <div className='rooms'>
            <div className="heading">Rooms:</div>
            <div onClick={() => setModalOpen(true)} className="pointer">[create room]</div>
            {rooms.map((room, index) => (
                <div key={room._id} className='room pointer' onClick={() => setActiveChannel({ ...room })}>{room.name}</div>
            ))}
        </div>
    )
}

export default Rooms