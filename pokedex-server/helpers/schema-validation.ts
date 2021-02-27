import Joi = require('@hapi/joi');

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(2).required()
});

const insertUserSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  name: Joi.string().required(),
  role: Joi.number().required()
});

const updateUserSchema = Joi.object({
  email: Joi.string().email().lowercase().trim(),
  name: Joi.string(),
  role: Joi.number()
});

export { authSchema, insertUserSchema, updateUserSchema };

