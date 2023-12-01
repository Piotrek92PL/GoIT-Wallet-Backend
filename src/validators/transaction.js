import Joi from "joi";
export const contactSchema = Joi.object({
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string(), //.required(), tutaj potrzeba konkretne kategorie trzymane w mongo
  comment: Joi.string(),
  date: Joi.date(),
});
