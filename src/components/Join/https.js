const sendCredentials = (path, credentials) => {
    return fetch('http://localhost:80' + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
}

module.exports = { sendCredentials }