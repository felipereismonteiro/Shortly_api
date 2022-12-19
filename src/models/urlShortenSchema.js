import joi from "joi";

export const urlShortenSchema = joi.object({
  url: joi.string().min(0).required(),
});
