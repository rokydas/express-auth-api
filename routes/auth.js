const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { registerValidation } = require('../validation')

router.post('/register', async (req, res) => {

    // validation before making user
    const error = registerValidation(req.body)
    if (error) return res.status(400).send({ err: error.details[0].message })

    // checking if the user's email exists in the db
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(409).send({ err: "user is already registered" })

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(hashPassword)

    // adding user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(404).send({ err: err })
    }








})

// router.post('/login')


module.exports = router