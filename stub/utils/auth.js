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
            res.cookie(AUTH_COOKIE_SESSION, authCookie)
            res.cookie(AUTH_COOKIE_USERNAME, username)
            if (rememberMe) {
                res.cookie(AUTH_COOKIE_REMEMBER_ME, rememberMeCookie)
            }
        }
    }
    next()
}

const sendStatus = (req, res) => {
    if (req.body) {
        const username = req.body.username
        if (username === validUsername) {
            res.status(200)
            res.json({})
        }
    }
    res.status(500).json({
        error: 'server error',
        errorDescription: 'Некорректный логин или пароль'
    })
}

module.exports = { addAuthCookie, sendStatus }