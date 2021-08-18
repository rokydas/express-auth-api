const router = require('express').Router()
const User = require('../model/User')

// validation
const Joi = require('@hapi/joi')
const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required(),
    password: Joi.string().min(3).required()
}

router.post('/register', async (req, res) => {

    // validation before making user
    const {error} = Joi.validate(req.body, schema);
    if(error == null) {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        try {
            const savedUser = await user.save()
            res.send(savedUser)
        } catch (err) {
            res.status(404).send({err: err})
        }
    }
    else {
        res.status(400).send({err: error.details[0].message})
    }
    

    
})

// router.post('/login')


module.exports = router