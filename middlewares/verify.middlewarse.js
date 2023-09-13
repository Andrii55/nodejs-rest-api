const Joi = require("joi");

const tokenSchema = Joi.string().alphanum().length(64).required();

module.exports = { tokenSchema };
