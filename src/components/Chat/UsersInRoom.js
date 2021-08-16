const UsersInRoom = ({ users = [] }) => {
    return (
        <div className='usersInRoom'>
            <div className="heading">Users in room:</div>
            {users.map(user => (
                <div key={user} className='user' >{user}</div>
            ))}
        </div>
    )
}

export default UsersInRoom