import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(1).max(30).required(),
    confirmPassword: joi.string().min(1).max(30).required()
})