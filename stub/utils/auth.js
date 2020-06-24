const validUsername = 'admin@mail.ru'
const authCookie = 123456
const rememberMeCookie = 777777777

const { 
    AUTH_COOKIE_SESSION, 
    AUTH_COOKIE_USERNAME,
    AUTH_COOKIE_REMEMBER_ME,
} = require('../../src/constants/http')

const addAuthCookie = (req, res, next) => {
    if (req.body) {
        const { username, rememberMe } = req.body
        if (username === validUsername) {
            req.cookie(AUTH_COOKIE_SESSION, authCookie)
            req.cookie(AUTH_COOKIE_USERNAME, username)
            if (rememberMe) {
                req.cookie(AUTH_COOKIE_REMEMBER_ME, rememberMeCookie)
            }
        }
    }
    next()
}

const sendStatus = (req, res) => {
    if (req.body) {
        const username = req.body.username
        if (username === validUsername) {
            res.sendStatus(200).send({})
        }
    }

    res.sendStatus(401).send({})
}

module.exports = { addAuthCookie, sendStatus }