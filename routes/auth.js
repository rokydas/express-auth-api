const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')

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

    // adding user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send({msg: "registration successful"})
    } catch (err) {
        res.status(404).send({ err: err })
    }
})

router.post('/login', async (req, res) => { 

    // validation before making user
    const error = loginValidation(req.body)
    if (error) return res.status(400).send({ err: error.details[0].message })

    // checking if the user's email exists in the db
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(409).send({ err: "user not found" })

    // password checking
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send({err: "Incorrect Password"})

    // create and assign a token
    const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_SECRET)
    const newResponse = {...user._doc, token}
    // res.header('auth-token', token).send(user)
    res.send(newResponse)
    
    // successful login
    // res.send({msg: 'Logged in'})
})



module.exports = router