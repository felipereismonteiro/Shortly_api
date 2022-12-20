import joi from "joi";

export const postUrlShortenSchema = joi.object({
  url: joi.string().min(0).required(),
});
