import { useState } from 'react';
import { sendCredentials } from './https';
import ShowErrors from './ShowErrors.js'

const Join = ({ logIn }) => {
    const [action, setAction] = useState('logIn')
    const [name, setName] = useState('');
    const [pass, setPass] = useState('tomas');
    const [email, setEmail] = useState('tomas@gmail.com');
    const [errors, setErrors] = useState([]);

    const toggleAction = () => {
        action === 'logIn' ? setAction('signIn') : setAction('logIn');
        setErrors([]);
    }

    const handleLogin = () => {
        sendCredentials('/login', { password: pass, email })
            .then(data => data.json())
            .then(data => data.errorList ? setErrors(data.errorList) : logIn(data.username, data.email))
            .catch(err => console.log(err, 'error'))
    }

    const handleSignIn = () => {
        sendCredentials('/signIn', { username: name, password: pass, email })
            .then(data => data.json())
            .then(data => data.errorList ? setErrors(data.errorList) : toggleAction())
            .catch(err => console.log(err, 'error'))
    }

    return (
        <div className="wrapper">
            <div className="form">
                <button onClick={toggleAction}>
                    {action === 'logIn' ? 'signIn' : 'logIn'}
                </button>
                <h1 className="heading">{action}</h1>
                <div>
                    <input
                        placeholder="email"
                        type='email'
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                    />
                </div>
                {action === 'signIn'
                    ? <div>
                        <input
                            placeholder="Username"
                            type='text'
                            onChange={event => setName(event.target.value)}
                        />
                    </div>
                    : null
                }
                <div>
                    <input
                        placeholder="password"
                        type='password'
                        value={pass}
                        onChange={event => setPass(event.target.value)}
                    />
                </div>
                <button onClick={action === 'logIn' ? handleLogin : handleSignIn}>click</button>
            </div>
            <ShowErrors errors={errors} />
        </div>
    )
}

export default Join;