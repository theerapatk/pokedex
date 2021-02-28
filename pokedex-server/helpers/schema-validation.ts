import Joi = require('@hapi/joi');

const registerUserSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  name: Joi.string().required(),
  password: Joi.string().min(4).required()
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

export { registerUserSchema, insertUserSchema, updateUserSchema };

