import Joi = require('@hapi/joi');

const registerUserSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  name: Joi.string().required(),
  password: Joi.string().min(8).trim().required()
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

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().trim().required(),
  password: Joi.string().min(8).trim().required(),
  confirmPassword: Joi.string().min(8).trim().required()
});

export {
  registerUserSchema, insertUserSchema,
  updateUserSchema, changePasswordSchema
};

