// validation
const Joi = require('@hapi/joi')

// registerValidation 
const registerValidation = (body) => {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(5).required(),
        password: Joi.string().min(3).required()
    }
    const {error} = Joi.validate(body, schema);
    return error
} 

const loginValidation = (body) => {
    const schema = {
        email: Joi.string().min(5).required(),
        password: Joi.string().min(3).required()
    }
    const {error} = Joi.validate(body, schema);
    return error
} 

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation