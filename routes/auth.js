const router = require('express').Router()

router.post('/register', (req, res) => {
    res.send('register called')
})

// router.post('/login')


module.exports = router