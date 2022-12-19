import Joi from "joi";

export const signInSchema = Joi.object({
    email: Joi.string().min(1).required(),
    password: Joi.string().min(1).required()
});