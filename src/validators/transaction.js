import Joi from "joi";
export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(1),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "pl"] },
  }),
  favorite: Joi.bool(),
});

export const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});
