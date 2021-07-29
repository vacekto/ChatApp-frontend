const sendCredentials = (path, credentials) => {
    return fetch('https://localhost:443' + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
}

module.exports = { sendCredentials }