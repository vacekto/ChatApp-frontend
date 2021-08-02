const Rooms = ({ rooms }) => {
    return (
        <div className='rooms'>
            {rooms.map((room, index) => (
                <div key={room._id}>room {index + 1}</div>
            ))}
        </div>
    )
}

export default Rooms